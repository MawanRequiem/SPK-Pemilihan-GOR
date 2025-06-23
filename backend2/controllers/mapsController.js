// backend/controllers/mapsController.js
const axios = require('axios')

exports.geocode = async (req, res) => {
  const query = req.query.query
  if (!query) return res.status(400).json({ error: 'Query tidak boleh kosong' })

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`
    const { data } = await axios.get(url)

    if (data.status !== 'OK') {
      return res.status(404).json({ error: 'Lokasi tidak ditemukan' })
    }

    return res.json({
      results: data.results.slice(0, 100) // batasi hasil
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getDistance = async (req, res) => {
  const { originLat, originLng, destLat, destLng } = req.query

  if (!originLat || !originLng || !destLat || !destLng) {
    return res.status(400).json({ error: 'Parameter lokasi tidak lengkap' })
  }

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destLat},${destLng}&mode=driving&key=${apiKey}`

    const response = await axios.get(url)
    const data = response.data

    if (data.status !== 'OK') {
      return res.status(400).json({ error: 'Gagal menghitung jarak' })
    }

    const distance = data.rows[0].elements[0].distance.value
    res.json({ distance })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

