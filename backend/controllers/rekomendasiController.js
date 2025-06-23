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
             f.parkir_score, f.km_mandi_score, f.km_ganti_score, f.kantin_score
      FROM gor g
      LEFT JOIN fasilitas f ON f.id_gor = g.id_gor
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
      const fasilitasScore = Math.round(
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
        lapangan: parseInt(gor.jumlah_lapangan) || 0,
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

    // --- STEP 7: Normalisasi matriks keputusan ---
    const normalisasi = alternatif.map(alt => {
      const normalized = { ...alt }
      kriteria.forEach(k => {
        const vals = alternatif.map(a => a[k])
        const maxVal = Math.max(...vals)
        const minVal = Math.min(...vals)
        const range = maxVal - minVal
        
        // Normalisasi ke rentang [0,1]
        if (range > 0) {
          if (['harga', 'jarak'].includes(k)) {
            // Untuk kriteria cost: nilai kecil = baik (1), nilai besar = buruk (0)
            normalized[k] = (maxVal - alt[k]) / range
          } else {
            // Untuk kriteria benefit: nilai besar = baik (1), nilai kecil = buruk (0)
            normalized[k] = (alt[k] - minVal) / range
          }
        } else {
          normalized[k] = 1 // Jika semua nilai sama, anggap optimal
        }
      })
      return normalized
    })

    console.log('[DIA] Normalized data sample:', normalisasi[0])

    // --- STEP 8: Tentukan ideal positif dan negatif dari data yang sudah dinormalisasi ---
    const ideal = {}
    kriteria.forEach(k => {
      const normalizedVals = normalisasi.map(a => a[k])
      const maxNormalized = Math.max(...normalizedVals)
      const minNormalized = Math.min(...normalizedVals)
      
      // Ideal positif = nilai terbaik = 1 (atau mendekati 1)
      // Ideal negatif = nilai terburuk = 0 (atau mendekati 0)
      ideal[k] = { 
        positif: maxNormalized, 
        negatif: minNormalized 
      }
    })

    console.log('[DIA] Ideal values (normalized):', ideal)

    // --- STEP 9: Hitung jarak menggunakan Manhattan Distance ---
    const hasilPerhitungan = normalisasi.map(alt => {
      let distanceToPositif = 0
      let distanceToNegatif = 0

      kriteria.forEach(k => {
        const weight = bobot[k]
        const normalizedValue = alt[k]
        const idealPositif = ideal[k].positif
        const idealNegatif = ideal[k].negatif
        
        // Manhattan distance ke ideal positif dan negatif
        distanceToPositif += weight * Math.abs(normalizedValue - idealPositif)
        distanceToNegatif += weight * Math.abs(normalizedValue - idealNegatif)
      })

      // Dalam DIA, yang terbaik adalah yang paling dekat ke ideal positif
      // Jadi skor akhir = distance to positive ideal (semakin kecil semakin baik)
      return {
        id: alt.id,
        nama: alt.nama,
        distanceToPositif: parseFloat(distanceToPositif.toFixed(4)),
        distanceToNegatif: parseFloat(distanceToNegatif.toFixed(4)),
        details: {
          harga: alternatif.find(a => a.id === alt.id).harga,
          rating: alternatif.find(a => a.id === alt.id).rating,
          jarak: alternatif.find(a => a.id === alt.id).jarak,
          fasilitas: alternatif.find(a => a.id === alt.id).fasilitas,
          waktu: alternatif.find(a => a.id === alt.id).waktu,
          normalized: {
            harga: alt.harga,
            rating: alt.rating,
            jarak: alt.jarak,
            fasilitas: alt.fasilitas,
            waktu: alt.waktu
          }
        }
      }
    })

    // --- STEP 10: Urutkan berdasarkan jarak ke ideal positif (ascending - yang terkecil = terbaik) ---
    const hasil = hasilPerhitungan.sort((a, b) => a.distanceToPositif - b.distanceToPositif)

    console.log('[DIA] Final results:', hasil.map(h => ({ 
      nama: h.nama, 
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
        [userInputId, r.id, r.distanceToPositif, i + 1, user_id, currentTimestamp]
      )
    }

    console.log(`[DIA] Saved ${hasil.length} recommendations to database`)

    // --- STEP 12: Response ---
    res.json({ 
      rekomendasi: hasil.map((h, index) => ({
        id: h.id,
        nama: h.nama,
        score: h.distanceToPositif,
        distance: h.distanceToPositif,
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