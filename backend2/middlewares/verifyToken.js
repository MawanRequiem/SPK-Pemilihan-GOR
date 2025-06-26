const jwt = require('jsonwebtoken')
const db = require('../db')

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) return res.status(401).json({ error: 'Token tidak ditemukan' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userRes = await db.query('SELECT * FROM users WHERE id = $1', [decoded.id])

    if (userRes.rows.length === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan' })
    }

    req.user = userRes.rows[0]
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Token tidak valid' })
  }
}

module.exports = verifyToken // ✅ ekspor fungsi langsung
