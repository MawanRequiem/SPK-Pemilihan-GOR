const express = require('express')
const router = express.Router()
const rekomendasiController = require('../controllers/rekomendasiController')
const verifyToken = require('../middlewares/verifyToken')

// 🔐 Lindungi route dengan JWT
router.post('/', verifyToken, rekomendasiController.prosesDIA)

module.exports = router
