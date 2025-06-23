const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
const mapsRoutes = require('./routes/maps')
const rekomendasiRoutes = require('./routes/rekomendasi')
const historyRoutes = require('./routes/histori')

const app = express()

app.use(helmet())
app.use(cors({
  origin: [ process.env.FRONTEND_URL, 'https://eligor.web.id', 'http://localhost:5174', "16.176.221.220"],
  credentials: true
}));
app.use(express.json({ limit: '1mb' }))
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }))
app.disable('x-powered-by')

// Router
app.use('/api/admin', adminRoutes)
app.use('/api', userRoutes)
app.use('/api', mapsRoutes)
app.use('/api/maps', mapsRoutes)
app.use('/api/rekomendasi', rekomendasiRoutes)
app.use('/api/riwayat', historyRoutes)

const PORT = process.env.PORT || 8080
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});