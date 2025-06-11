const db = require('../db')

// Ambil semua GOR
exports.getAllGOR = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT g.*, l.nama_jenis AS jenis_lapangan
      FROM gor g
      LEFT JOIN lapangan l ON g.id_jenis = l.id_jenis
      ORDER BY g.id_gor DESC
    `)
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Tambah GOR
exports.addGOR = async (req, res) => {
  const {
    nama,
    rating,
    hargaSewa,
    jumlahLapangan,
    jenisLapanganId,
    checklist,
    latitude,
    longitude,
    kota,
    provinsi,
    createdBy,
    alamat
  } = req.body

  // Validasi alamat
  if (!alamat) {
    return res.status(400).json({ error: 'Alamat tidak boleh kosong' })
  }

  // Validasi field wajib
  if (!nama || !rating || !hargaSewa || !jumlahLapangan || !jenisLapanganId || !latitude || !longitude || !createdBy || !checklist) {
    return res.status(400).json({ error: 'Field tidak lengkap' })
  }

  try {
    // Cek nama GOR yang sudah ada
    const cekNama = await db.query(`SELECT id_gor FROM gor WHERE LOWER(nama_gor) = LOWER($1)`, [nama])
    if (cekNama.rows.length > 0) {
      return res.status(409).json({ error: 'GOR dengan nama tersebut sudah ada' })
    }

    // Fungsi hitung skor
    const hitungSkor = (jumlah, max) => {
      if (jumlah <= 2) return 0
      if (jumlah <= 5) return 1
      if (jumlah <= 7) return 2
      return 3
    }

    // Insert GOR dan ambil ID yang baru dibuat
    const result = await db.query(`
      INSERT INTO gor (
          nama_gor, rating, harga_sewa, jumlah_lapangan,
          id_jenis, latitude, longitude, alamat,
          kota, provinsi, created_by
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING id_gor
    `, [
      nama, rating, hargaSewa, jumlahLapangan,
      jenisLapanganId, latitude, longitude, alamat,
      kota, provinsi, createdBy
    ])

    const id_gor = result.rows[0].id_gor

    // Hitung skor berdasarkan jumlah checklist per fasilitas
    const parkirScore = hitungSkor(checklist.parkir?.length || 0, 8)
    const kmMandiScore = hitungSkor(checklist.kamarMandi?.length || 0, 10)
    const kmGantiScore = hitungSkor(checklist.kamarGanti?.length || 0, 10)
    const kantinScore = hitungSkor(checklist.kantin?.length || 0, 10)

    // Insert fasilitas
    await db.query(
      `INSERT INTO fasilitas (id_gor, parkir_score, km_mandi_score, km_ganti_score, kantin_score)
       VALUES ($1, $2, $3, $4, $5)`,
      [id_gor, parkirScore, kmMandiScore, kmGantiScore, kantinScore]
    )

    res.status(201).json({ 
      message: 'GOR berhasil ditambahkan', 
      id_gor,
      fasilitas_scores: {
        parkir: parkirScore,
        kamar_mandi: kmMandiScore,
        kamar_ganti: kmGantiScore,
        kantin: kantinScore
      }
    })
  } catch (err) {
    console.error('Error adding GOR:', err)
    res.status(500).json({ error: err.message })
  }
}