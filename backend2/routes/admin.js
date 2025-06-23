const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

// Routes untuk GOR management
router.get('/gor', adminController.getAllGOR)
router.put('/gor/:id', adminController.updateGOR)
router.delete('/gor/:id', adminController.deleteGOR)
router.post('/gor/tambahgor', adminController.addGOR)

// Routes untuk DSS statistics dan history
router.get('/dss-history', adminController.getDSSHistory)
router.get('/dss-stats', adminController.getDSSStats)
router.get('/total-users', adminController.getTotalUsers)
router.get('/history-all', adminController.getAllHistory);

module.exports = router