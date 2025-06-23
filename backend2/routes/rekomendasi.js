const express = require('express')
const router = express.Router()
const rekomendasiController = require('../controllers/rekomendasiController')

router.post('/', rekomendasiController.prosesDIA)

module.exports = router
