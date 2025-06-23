// backend/routes/maps.js
const express = require('express')
const router = express.Router()
const mapsController = require('../controllers/mapsController')

// Endpoint proxy geocoding
router.get('/geocode', mapsController.geocode)
router.get('/distance', mapsController.getDistance)


module.exports = router
