// File: controllers/rekomendasiController.js
const db = require('../db')
const axios = require('axios')

// Hitung skor & simpan rekomendasi
exports.prosesDIA = async (req, res) => {
  const { user_id, jarakManual, waktuMain, metodeJarak, gorData } = req.body

  try {
    // --- STEP 1: Catat User Input ---
    const inputRes = await db.query(
      `INSERT INTO user_input (user_id, lokasi_lat, lokasi_lng, hari_main, jam_main)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [
        user_id,
        req.body.user_lat || null,   // optional: jika mau simpan lokasi user
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
      return res.status(400).json({ error: 'User belum isi preferensi' })
    }
    const preferensi = prefRes.rows[0]

    // --- STEP 3: Ambil data GOR + fasilitas ---
    const gorRes = await db.query(`
      SELECT g.id_gor, g.nama_gor, g.rating, g.harga_sewa, g.jumlah_lapangan,
             g.latitude, g.longitude,
             f.parkir_score, f.km_mandi_score, f.km_ganti_score, f.kantin_score
      FROM gor g
      LEFT JOIN fasilitas f ON f.id_gor = g.id_gor
    `)
    const dbGors = gorRes.rows

    // --- STEP 4: Bangun array alternatif dengan atribut final ---
    const alternatif = []
    for (const gor of dbGors) {
      let harga = gor.harga_sewa
      const jam = parseInt(waktuMain.jam)
      const hari = waktuMain.hari.toLowerCase()
      if (jam >= 18 && jam <= 22) harga += 5000
      if (['jumat','sabtu','minggu'].includes(hari)) harga += 5000

      let jarakMeter = 99999
      if (metodeJarak === 'manual') {
        jarakMeter = jarakManual[gor.id_gor] ?? 99999
      } else {
        // cari di gorData yang dikirim frontend
        const m = gorData.find(g => g.id_gor === gor.id_gor)
        jarakMeter = m?.jarak_meter ?? 99999
      }

      const fasilitasScore = Math.round(
        ((gor.parkir_score||0) + (gor.km_mandi_score||0) + (gor.km_ganti_score||0) + (gor.kantin_score||0)) / 4
      )

      alternatif.push({
        id: gor.id_gor,
        nama: gor.nama_gor,
        harga,
        rating: parseFloat(gor.rating),
        jarak: jarakMeter,
        lapangan: gor.jumlah_lapangan, // bisa ambil jenis lapangan skor lain
        fasilitas: fasilitasScore,
        jumlah: gor.jumlah_lapangan
      })
    }

    // --- STEP 5: Hitung ideal positif & negatif ---
    const kriteria = ['harga','rating','jarak','lapangan','fasilitas','jumlah']
    const bobot = {
      harga: preferensi.preferensi_harga,
      rating: preferensi.preferensi_rating,
      jarak: preferensi.preferensi_jarak,
      lapangan: preferensi.preferensi_lapangan,
      fasilitas: preferensi.preferensi_fasilitas,
      jumlah: preferensi.preferensi_jumlah_lapangan
    }

    const ideal = {}
    kriteria.forEach(k => {
      const vals = alternatif.map(a => a[k])
      ideal[k] = { max: Math.max(...vals), min: Math.min(...vals) }
    })

    // --- STEP 6: Hitung distance to ideal & skor ---
    const hasil = alternatif.map(a => {
      let dPlus=0, dMin=0
      kriteria.forEach(k => {
        const w=bobot[k], v=a[k], im=ideal[k]
        dPlus += Math.pow(w*(v - im.max),2)
        dMin  += Math.pow(w*(v - im.min),2)
      })
      dPlus=Math.sqrt(dPlus); dMin=Math.sqrt(dMin)
      const score = (dPlus + dMin===0?0: dMin/(dPlus+dMin))
      return { id: a.id, nama: a.nama, score: parseFloat(score.toFixed(4)) }
    }).sort((a,b)=>b.score-a.score)

    // --- STEP 7: Simpan hasil ke tabel hasil_rekomendasi ---
    for (let i=0; i<hasil.length; i++) {
      const r = hasil[i]
      await db.query(
        `INSERT INTO hasil_rekomendasi 
         (user_input_id, id_gor, skor, ranking, user_id) 
         VALUES ($1,$2,$3,$4,$5)`,
        [userInputId, r.id, r.score, i+1, user_id]
      )
    }

    // --- STEP 8: Kirim response ---
    res.json({ rekomendasi: hasil })
  } catch (err) {
    console.error('[prosesDIA error]', err)
    res.status(500).json({ error: err.message })
  }
}