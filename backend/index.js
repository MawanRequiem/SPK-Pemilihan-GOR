const express = require('express')
const cors = require('cors')
require('dotenv').config()

const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
const mapsRoutes = require('./routes/maps')
const rekomendasiRoutes = require('./routes/rekomendasi')
const historyRoutes = require('./routes/histori')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/admin', adminRoutes)
app.use('/api', userRoutes)
app.use('/api', mapsRoutes)
app.use('/api/maps', mapsRoutes)
app.use('/api/rekomendasi', rekomendasiRoutes)
app.use('/api/riwayat', historyRoutes)

app.listen(3000, () => {
  console.log('Server aktif di http://localhost:3000')
})
