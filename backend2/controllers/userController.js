const db = require('../db')
const bcrypt = require('bcryptjs')

// Simpan user baru dengan password hash, role default "user"
exports.register = async (req, res) => {
  const { nama_lengkap, email, password, lokasi_lat, lokasi_lng, provinsi, kota, kecamatan } = req.body
  if (!nama_lengkap || !email || !password) {
    return res.status(400).json({ error: 'Semua field wajib diisi' })
  }

  try {
    // Cek apakah email sudah digunakan
    const cekEmail = await db.query('SELECT id FROM users WHERE email = $1', [email])
    if (cekEmail.rows.length > 0) {
      return res.status(409).json({ error: 'Email sudah terdaftar' })
    }

    const hashed = await bcrypt.hash(password, 10)

    const result = await db.query(
        `INSERT INTO users (nama_lengkap, email, password_hash, lokasi_lat, lokasi_lng, provinsi, kota, kecamatan)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
        [nama_lengkap, email, hashed, lokasi_lat, lokasi_lng, provinsi, kota, kecamatan]
    )

    res.status(201).json({ user_id: result.rows[0].id, message: 'Registrasi berhasil' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email])
    const user = result.rows[0]
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan' })

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) return res.status(401).json({ error: 'Password salah' })

    res.json({
      user_id: user.id,
      role: user.role,
      nama_lengkap: user.nama_lengkap,
      message: 'Login berhasil'
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.saveSurvey = async (req, res) => {
  const {
    user_id,
    harga,
    rating,
    jarak,
    lapangan,
    fasilitas,
    jumlah,
    waktu // preferensi waktu main
  } = req.body

  if (
    !user_id || !harga || !rating || !jarak ||
    !lapangan || !fasilitas || !jumlah || !waktu
  ) {
    return res.status(400).json({ error: 'Semua field wajib diisi' })
  }

  try {
    // Cek jika user sudah pernah isi survey
    const existed = await db.query(
      'SELECT id FROM user_survey WHERE user_id=$1 ORDER BY id DESC LIMIT 1', 
      [user_id]
    )
    if (existed.rows.length > 0) {
      // Sudah pernah, update
      await db.query(
        `UPDATE user_survey SET 
           preferensi_harga=$1, preferensi_rating=$2, preferensi_jarak=$3, 
           preferensi_lapangan=$4, preferensi_fasilitas=$5, preferensi_jumlah_lapangan=$6,
           preferensi_waktu=$7
         WHERE user_id=$8`,
        [harga, rating, jarak, lapangan, fasilitas, jumlah, waktu, user_id]
      )
    } else {
      // Insert baru
      await db.query(
        `INSERT INTO user_survey (
            preferensi_harga, preferensi_rating, preferensi_jarak, preferensi_lapangan, 
            preferensi_fasilitas, preferensi_jumlah_lapangan, preferensi_waktu, user_id
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [harga, rating, jarak, lapangan, fasilitas, jumlah, waktu, user_id]
      )
    }
    res.status(201).json({ message: 'Preferensi berhasil disimpan' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// **Get survey preferensi by user_id only**
exports.getSurvey = async (req, res) => {
  const { user_id } = req.params
  try {
    const cek = await db.query(`
      SELECT * FROM user_survey
      WHERE user_id = $1
      ORDER BY id DESC
      LIMIT 1
    `, [user_id])

    if (cek.rows.length > 0) {
      res.json({ found: true, data: cek.rows[0] })
    } else {
      res.json({ found: false })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getUserById = async (req, res) => {
  const { id } = req.params

  try {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan' })
    }
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// PATCH /api/user/update/:id
exports.updateProfile = async (req, res) => {
  const { id } = req.params
  const { nama_lengkap, email, provinsi, kota, kecamatan, lokasi_lat, lokasi_lng } = req.body

  try {
    await db.query(
      `UPDATE users 
       SET nama_lengkap = $1, email = $2, provinsi = $3, kota = $4, kecamatan = $5, lokasi_lat = $6, lokasi_lng = $7
       WHERE id = $8`,
      [nama_lengkap, email, provinsi, kota, kecamatan, lokasi_lat, lokasi_lng, id]
    )
    res.json({ message: 'Profil berhasil diperbarui' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// PATCH /api/user/password/:id
exports.changePassword = async (req, res) => {
  const { id } = req.params
  const { oldPassword, newPassword } = req.body

  try {
    const result = await db.query('SELECT password_hash FROM users WHERE id = $1', [id])
    if (result.rows.length === 0) return res.status(404).json({ error: 'User tidak ditemukan' })

    const valid = await bcrypt.compare(oldPassword, result.rows[0].password_hash)
    if (!valid) return res.status(401).json({ error: 'Password lama salah' })

    const hashed = await bcrypt.hash(newPassword, 10)
    await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hashed, id])

    res.json({ message: 'Password berhasil diubah' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


// GET latest ranking for a user
exports.getLatestRanking = async (req, res) => {
  const { user_id } = req.params
  try {
    const tsRes = await db.query(
      `SELECT MAX(tanggal_buat) AS latest
       FROM hasil_rekomendasi
       WHERE user_id = $1`,
      [user_id]
    )
    const latest = tsRes.rows[0].latest
    if (!latest) {
      return res.json({ ranking: [], tanggal: null })
    }

    const rankRes = await db.query(
      `SELECT hr.id_gor, hr.skor, hr.ranking,
              g.nama_gor, g.kota, g.provinsi, g.harga_sewa
       FROM hasil_rekomendasi hr
       JOIN gor g ON hr.id_gor = g.id_gor
       WHERE hr.user_id = $1 AND hr.tanggal_buat = $2
       ORDER BY hr.ranking`,
      [user_id, latest]
    )

    res.json({
      ranking: rankRes.rows.map(r => ({
        id_gor:         r.id_gor,
        nama_gor:       r.nama_gor,
        kota:           r.kota,
        provinsi:       r.provinsi,
        harga_sewa:     r.harga_sewa,  // <–– tambahkan ini
        skor:           r.skor,
        ranking:        r.ranking,
        rating:         r.rating
      })),
      tanggal: latest
    })
  } catch (err) {
    console.error('[getLatestRanking error]', err)
    res.status(500).json({ error: err.message })
  }
}