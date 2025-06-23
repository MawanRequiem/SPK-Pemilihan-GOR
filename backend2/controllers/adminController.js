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

// Update GOR
exports.updateGOR = async (req, res) => {
  const { id } = req.params
  const { nama_gor, rating, harga_sewa, jumlah_lapangan } = req.body

  try {
    // Cek apakah GOR exists
    const checkGOR = await db.query('SELECT id_gor FROM gor WHERE id_gor = $1', [id])
    if (checkGOR.rows.length === 0) {
      return res.status(404).json({ error: 'GOR tidak ditemukan' })
    }

    // Cek nama GOR yang sudah ada (exclude current GOR)
    const cekNama = await db.query(`
      SELECT id_gor FROM gor 
      WHERE LOWER(nama_gor) = LOWER($1) AND id_gor != $2
    `, [nama_gor, id])
    
    if (cekNama.rows.length > 0) {
      return res.status(409).json({ error: 'GOR dengan nama tersebut sudah ada' })
    }

    // Update GOR
    const result = await db.query(`
      UPDATE gor 
      SET nama_gor = $1, rating = $2, harga_sewa = $3, jumlah_lapangan = $4, updated_at = NOW()
      WHERE id_gor = $5
      RETURNING *
    `, [nama_gor, rating, harga_sewa, jumlah_lapangan, id])

    res.json({ 
      message: 'GOR berhasil diupdate', 
      data: result.rows[0] 
    })
  } catch (err) {
    console.error('Error updating GOR:', err)
    res.status(500).json({ error: err.message })
  }
}

// Delete GOR
exports.deleteGOR = async (req, res) => {
  const { id } = req.params

  try {
    // Cek apakah GOR exists
    const checkGOR = await db.query('SELECT id_gor FROM gor WHERE id_gor = $1', [id])
    if (checkGOR.rows.length === 0) {
      return res.status(404).json({ error: 'GOR tidak ditemukan' })
    }

    // Delete related data first (fasilitas, hasil_rekomendasi, etc.)
    await db.query('DELETE FROM fasilitas WHERE id_gor = $1', [id])
    await db.query('DELETE FROM hasil_rekomendasi WHERE id_gor = $1', [id])
    
    // Delete GOR
    await db.query('DELETE FROM gor WHERE id_gor = $1', [id])

    res.json({ message: 'GOR berhasil dihapus' })
  } catch (err) {
    console.error('Error deleting GOR:', err)
    res.status(500).json({ error: err.message })
  }
}

// Ambil histori penggunaan DSS
exports.getDSSHistory = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        ui.id,
        ui.waktu_submit,
        u.nama_lengkap as user_name,
        ui.budget,
        ui.jarak_max,
        ui.rating_min,
        ui.jumlah_lapangan_min,
        (
          SELECT g.nama_gor 
          FROM hasil_rekomendasi hr 
          JOIN gor g ON hr.id_gor = g.id_gor 
          WHERE hr.user_input_id = ui.id 
          ORDER BY hr.ranking LIMIT 1
        ) as top_recommendation
      FROM user_input ui
      JOIN users u ON ui.user_id = u.id
      ORDER BY ui.waktu_submit DESC
      LIMIT 50
    `)

    const history = result.rows.map(row => ({
      ...row,
      kriteria: `Budget: Rp${row.budget?.toLocaleString('id-ID') || 'Tidak dibatasi'}, Jarak: ${row.jarak_max || 'Tidak dibatasi'}km, Rating min: ${row.rating_min || 'Tidak dibatasi'}, Lapangan min: ${row.jumlah_lapangan_min || 'Tidak dibatasi'}`
    }))

    res.json(history)
  } catch (err) {
    console.error('Error fetching DSS history:', err)
    res.status(500).json({ error: err.message })
  }
}

// Ambil statistik penggunaan DSS
exports.getDSSStats = async (req, res) => {
  try {
    // Total penggunaan DSS
    const totalResult = await db.query('SELECT COUNT(*) as total FROM user_input')
    const total = parseInt(totalResult.rows[0].total)

    // Penggunaan harian 7 hari terakhir
    const dailyResult = await db.query(`
      SELECT 
        DATE(waktu_submit) as date,
        COUNT(*) as count
      FROM user_input 
      WHERE waktu_submit >= NOW() - INTERVAL '7 days'
      GROUP BY DATE(waktu_submit)
      ORDER BY date
    `)

    // Generate data untuk 7 hari terakhir (fill missing dates with 0)
    const dailyData = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      const found = dailyResult.rows.find(row => 
        new Date(row.date).toISOString().split('T')[0] === dateStr
      )
      
      dailyData.push({
        date: date.toLocaleDateString('id-ID'),
        count: found ? parseInt(found.count) : 0
      })
    }

    res.json({
      total,
      daily: dailyData
    })
  } catch (err) {
    console.error('Error fetching DSS stats:', err)
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

exports.getTotalUsers = async (req, res) => {
  try {
    const result = await db.query('SELECT COUNT(*) AS total FROM users WHERE role = $1', ['user'])
    res.json({ total: parseInt(result.rows[0].total) })
  } catch (err) {
    console.error('Error fetching total users:', err)
    res.status(500).json({ error: err.message })
  }
}

exports.getAllHistory = async (req, res) => {
  try {
    // 1. Get all user_input order terbaru, sekalian join user detail
    const uiRes = await db.query(`
      SELECT 
        ui.id AS user_input_id, ui.waktu_submit, 
        ui.user_id,
        u.nama_lengkap AS user_nama,
        u.kota, u.provinsi
      FROM user_input ui
      JOIN users u ON ui.user_id = u.id
      ORDER BY ui.waktu_submit DESC
    `);
    const inputs = uiRes.rows;

    // 2. Untuk setiap user_input ambil hasil_rekomendasi join gor
    const history = [];
    for (const ui of inputs) {
      const hrRes = await db.query(`
        SELECT hr.id_gor, hr.skor, hr.ranking, g.nama_gor
        FROM hasil_rekomendasi hr
        JOIN gor g ON hr.id_gor = g.id_gor
        WHERE hr.user_input_id = $1
        ORDER BY hr.ranking
      `, [ui.user_input_id]);
      history.push({
        user_input_id: ui.user_input_id,
        waktu_submit: ui.waktu_submit,
        user_id: ui.user_id,
        user_nama: ui.user_nama,
        kota: ui.kota,
        provinsi: ui.provinsi,
        rekomendasi: hrRes.rows
      });
    }

    res.json({ history });
  } catch (err) {
    console.error('[admin_history error]', err);
    res.status(500).json({ error: err.message });
  }
};