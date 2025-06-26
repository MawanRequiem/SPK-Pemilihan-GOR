// middlewares/checkAdmin.js
module.exports = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Akses ditolak. Hanya admin yang diperbolehkan.' })
  }
  next()
}
