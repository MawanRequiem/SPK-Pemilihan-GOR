const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.get('/gor', adminController.getAllGOR)
router.post('/gor/tambahgor', adminController.addGOR)

module.exports = router
