// File: controllers/rekomendasiController.js (Fixed DIA Implementation)
const db = require('../db')
const axios = require('axios')

exports.prosesDIA = async (req, res) => {
  const { user_id, jarakManual, waktuMain, metodeJarak, gorData } = req.body

  try {
    // Validasi input
    if (!gorData || gorData.length === 0) {
      return res.status(400).json({ error: 'Tidak ada GOR yang dipilih' })
    }

    // --- STEP 1: Catat User Input ---
    const inputRes = await db.query(
      `INSERT INTO user_input (user_id, lokasi_lat, lokasi_lng, hari_main, jam_main)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [
        user_id,
        req.body.user_lat || null,
        req.body.user_lng || null,
        waktuMain.hari,
        waktuMain.jam
      ]
    )
    const userInputId = inputRes.rows[0].id

    // --- STEP 2: Ambil preferensi user ---
    const prefRes = await db.query(
      `SELECT *
      FROM user_survey
      WHERE user_id = $1
      ORDER BY id DESC
      LIMIT 1`,
      [user_id]
    )
    if (prefRes.rows.length === 0) {
      return res.status(400).json({ error: 'User belum isi preferensi survey' })
    }
    const preferensi = prefRes.rows[0]

    // --- STEP 3: Ambil data GOR + fasilitas HANYA untuk GOR yang dipilih ---
    const selectedGorIds = gorData.map(g => g.id_gor)
    const placeholders = selectedGorIds.map((_, i) => `$${i + 1}`).join(',')
    
    const gorRes = await db.query(`
      SELECT g.id_gor, g.nama_gor, g.rating, g.harga_sewa, g.jumlah_lapangan,
            g.latitude, g.longitude, g.alamat, g.kota, g.provinsi,
            f.parkir_score, f.km_mandi_score, f.km_ganti_score, f.kantin_score,
            j.score AS jenis_score
      FROM gor g
      LEFT JOIN fasilitas f ON f.id_gor = g.id_gor
      LEFT JOIN lapangan j ON g.id_jenis = j.id_jenis
      WHERE g.id_gor IN (${placeholders})
    `, selectedGorIds)
    
    const dbGors = gorRes.rows

    console.log(`[DIA] Processing ${dbGors.length} selected GORs for user ${user_id}`)

    // --- STEP 4: Hitung skor waktu pemakaian ---
    const hitungSkorWaktu = (hari, jam) => {
      // Sub-kriteria Hari (bobot relatif 0.6)
      const skorHari = ['jumat', 'sabtu', 'minggu'].includes(hari.toLowerCase()) ? 2 : 1
      
      // Sub-kriteria Jam (bobot relatif 0.4)
      let skorJam = 1 // default off-peak
      const jamInt = parseInt(jam)
      if (jamInt >= 18 && jamInt <= 22) {
        skorJam = 2 // peak hours
      } else if (jamInt >= 23 || jamInt <= 5) {
        skorJam = 1 // late hours
      }
      
      // Gabungkan dengan bobot relatif
      return (skorHari * 0.6) + (skorJam * 0.4)
    }

    // --- STEP 5: Bangun array alternatif dengan atribut final ---
    const alternatif = []
    for (const gor of dbGors) {
      // Hitung harga dinamis berdasarkan waktu (dengan surcharge)
      let harga = parseFloat(gor.harga_sewa) || 0
      const jam = parseInt(waktuMain.jam)
      const hari = waktuMain.hari.toLowerCase()
      
      // Peak hours surcharge (18:00 - 22:00)
      if (jam >= 18 && jam <= 22) harga += 5000
      
      // Weekend surcharge
      if (['jumat', 'sabtu', 'minggu'].includes(hari)) harga += 5000

      // Ambil jarak
      let jarakMeter = 99999
      if (metodeJarak === 'manual' && jarakManual[gor.id_gor]) {
        jarakMeter = parseFloat(jarakManual[gor.id_gor]) || 99999
      } else {
        const matchedGor = gorData.find(g => g.id_gor === gor.id_gor)
        jarakMeter = matchedGor?.jarak_meter || 99999
      }

      // Hitung skor fasilitas gabungan
      const fasilitasScore = parseFloat(
        ((gor.parkir_score || 0) + (gor.km_mandi_score || 0) + 
        (gor.km_ganti_score || 0) + (gor.kantin_score || 0)) / 4
      )

      // Hitung skor waktu pemakaian
      const waktuScore = hitungSkorWaktu(waktuMain.hari, waktuMain.jam)

      alternatif.push({
        id: gor.id_gor,
        nama: gor.nama_gor,
        harga: harga,
        rating: parseFloat(gor.rating) || 0,
        jarak: jarakMeter,
        lapangan: parseFloat(gor.jenis_score) || 0,
        fasilitas: fasilitasScore,
        jumlah: parseInt(gor.jumlah_lapangan) || 0,
        waktu: waktuScore // Kriteria waktu pemakaian baru
      })
    }

    console.log(`[DIA] Built ${alternatif.length} alternatives`)

    if (alternatif.length === 0) {
      return res.status(400).json({ error: 'Tidak ada data GOR yang valid untuk dihitung' })
    }

    // --- STEP 6: Definisi kriteria dan bobot (dengan waktu pemakaian) ---
    const kriteria = ['harga', 'rating', 'jarak', 'lapangan', 'fasilitas', 'jumlah', 'waktu']
    const bobot = {
      harga: parseFloat(preferensi.preferensi_harga) || 0,
      rating: parseFloat(preferensi.preferensi_rating) || 0,
      jarak: parseFloat(preferensi.preferensi_jarak) || 0,
      lapangan: parseFloat(preferensi.preferensi_lapangan) || 0,
      fasilitas: parseFloat(preferensi.preferensi_fasilitas) || 0,
      jumlah: parseFloat(preferensi.preferensi_jumlah_lapangan) || 0,
      waktu: parseFloat(preferensi.preferensi_waktu) || 0 // Bobot waktu pemakaian
    }

    console.log('[DIA] Weights:', bobot)

    console.log('[DIA] Data asli GOR sebelum normalisasi:')
    alternatif.forEach((alt, index) => {
      console.log(`GOR ${index + 1} (${alt.nama}):`, {
        harga: alt.harga,
        rating: alt.rating,
        jarak: alt.jarak,
        lapangan: alt.lapangan,
        fasilitas: alt.fasilitas,
        jumlah: alt.jumlah,
        waktu: alt.waktu
      })
    })

    // --- STEP 7: Normalisasi matriks keputusan ---
    const normalisasi = alternatif.map(alt => {
      const normalized = { ...alt }

      kriteria.forEach(k => {
        // Hitung jumlah kuadrat semua alternatif untuk kriteria k
        const squaresSum = alternatif.reduce((sum, a) => {
          console.log(`[DEBUG] ${a.nama_gor} - ${k}: ${a[k]}`)
          return sum + Math.pow(a[k], 2)
        }, 0)

        const rootSumSquares = Math.sqrt(squaresSum)
        console.log(`[DEBUG] √∑^2 ${k}:`, rootSumSquares)

        if (rootSumSquares > 0) {
          normalized[k] = parseFloat((alt[k] / rootSumSquares).toFixed(6)) // presisi agar setara dengan Excel
        } else {
          normalized[k] = 0
        }

        console.log(`[NORMALISASI] ${alt.nama_gor} - ${k}: ${normalized[k]}`)
      })

      return normalized
    })

    console.log('[DIA] Hasil normalisasi per GOR:')
    normalisasi.forEach((alt, i) => {
      console.log(`GOR ${i + 1} (${alternatif[i].nama}):`, {
        harga: alt.harga.toFixed(4),
        rating: alt.rating.toFixed(4),
        jarak: alt.jarak.toFixed(4),
        lapangan: alt.lapangan.toFixed(4),
        fasilitas: alt.fasilitas.toFixed(4),
        jumlah: alt.jumlah.toFixed(4),
        waktu: alt.waktu.toFixed(4),
      })
    })

    const normalizedWeighted = normalisasi.map(alt => {
    const weighted = { ...alt }

    kriteria.forEach(k => {
      weighted[k] = alt[k] * bobot[k]
    })

    return weighted
  })

    console.log('[DIA] Hasil normalisasi x bobot per GOR:')
    normalizedWeighted.forEach((alt, i) => {
      console.log(`GOR ${i + 1} (${alternatif[i].nama}):`, {
        harga: alt.harga.toFixed(4),
        rating: alt.rating.toFixed(4),
        jarak: alt.jarak.toFixed(4),
        lapangan: alt.lapangan.toFixed(4),
        fasilitas: alt.fasilitas.toFixed(4),
        jumlah: alt.jumlah.toFixed(4),
        waktu: alt.waktu.toFixed(4),
      })
    })

    console.log('[DIA] Normalized data sample:', normalisasi[0])

    // --- STEP 8: Tentukan ideal positif dan negatif dari data yang sudah dinormalisasi ---
    const costCriteria = ['harga', 'jarak']
    const ideal = {}
    kriteria.forEach(k => {
      const vals = normalizedWeighted.map(a => a[k])

      // Jika cost, maka nilai ideal positif = minimum (semakin kecil semakin baik)
      // Jika benefit, maka nilai ideal positif = maksimum (semakin besar semakin baik)
      if (costCriteria.includes(k)) {
        ideal[k] = {
          positif: Math.min(...vals),
          negatif: Math.max(...vals)
        }
      } else {
        ideal[k] = {
          positif: Math.max(...vals),
          negatif: Math.min(...vals)
        }
      }

      console.log(`[IDEAL] ${k}: +${ideal[k].positif}, -${ideal[k].negatif}`)
    })

    console.log('[DIA] Ideal values (normalized):', ideal)

    // --- STEP 9: Hitung jarak menggunakan Manhattan Distance ---
    const hasilPerhitungan = normalizedWeighted.map((alt, idx) => {
      let distanceToPositif = 0
      let distanceToNegatif = 0

      kriteria.forEach(k => {
        const nilai = alt[k]
        const idealPositif = ideal[k].positif
        const idealNegatif = ideal[k].negatif

        distanceToPositif += Math.abs(nilai - idealPositif)
        distanceToNegatif += Math.abs(nilai - idealNegatif)
      })

      return {
        id: alternatif[idx].id,
        nama: alternatif[idx].nama,
        distanceToPositif: parseFloat(distanceToPositif.toFixed(4)),
        distanceToNegatif: parseFloat(distanceToNegatif.toFixed(4)),
        details: {
          ...alternatif[idx],
          normalized: alt
        }
      }
    })

    // --- STEP 10: Urutkan berdasarkan jarak ke ideal positif (ascending - yang terkecil = terbaik) ---
    const minPositif = Math.min(...hasilPerhitungan.map(h => h.distanceToPositif))
    const maxNegatif = Math.max(...hasilPerhitungan.map(h => h.distanceToNegatif))

    const hasilDenganPi = hasilPerhitungan.map(h => {
      const pi = Math.sqrt(
        Math.pow(h.distanceToPositif - minPositif, 2) +
        Math.pow(h.distanceToNegatif - maxNegatif, 2)
      )

      return {
        ...h,
        Pi: pi
      }
    })

    const hasil = hasilDenganPi.sort((a, b) => a.Pi - b.Pi)

    console.log('[DIA] Final results:', hasil.map(h => ({
      nama: h.nama,
      Pi: h.Pi,
      distanceToPositif: h.distanceToPositif,
      distanceToNegatif: h.distanceToNegatif
    })))

    // --- STEP 11: Simpan hasil ke database ---
    const currentTimestamp = new Date().toISOString()
    
    for (let i = 0; i < hasil.length; i++) {
      const r = hasil[i]
      await db.query(
        `INSERT INTO hasil_rekomendasi 
        (user_input_id, id_gor, skor, ranking, user_id, tanggal_buat) 
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [userInputId, r.id, r.Pi, i + 1, user_id, currentTimestamp]
      )
    }

    console.log(`[DIA] Saved ${hasil.length} recommendations to database`)

    // --- STEP 12: Response ---
    res.json({ 
      rekomendasi: hasil.map((h, index) => ({
        id: h.id,
        nama: h.nama,
        score: h.Pi,
        distance: h.Pi,
        ranking: index + 1
      })),
      debug: {
        totalAlternatif: alternatif.length,
        idealValues: ideal,
        weights: bobot,
        rawData: alternatif,
        normalizedData: normalisasi,
        detailPerhitungan: hasil.map((h, index) => ({
          ranking: index + 1,
          nama: h.nama,
          score: h.Pi,
          distanceToPositif: h.distanceToPositif,
          distanceToNegatif: h.distanceToNegatif,
          details: h.details
        }))
      }
    })

  } catch (err) {
    console.error('[prosesDIA error]', err)
    res.status(500).json({ 
      error: 'Gagal menghitung rekomendasi',
      details: err.message 
    })
  }
}