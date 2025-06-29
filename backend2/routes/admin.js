const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const verifyToken = require('../middlewares/verifyToken')
const checkAdmin = require('../middlewares/checkAdmin')

// Middleware untuk semua route admin
router.use(verifyToken)

// ✅ Routes untuk GOR management
router.get('/gor', adminController.getAllGOR)
router.put('/gor/:id', checkAdmin, adminController.updateGOR)
router.delete('/gor/:id', checkAdmin, adminController.deleteGOR)
router.post('/gor/tambahgor', checkAdmin, adminController.addGOR)

// ✅ Routes untuk DSS statistics dan history
router.get('/dss-history', checkAdmin, adminController.getDSSHistory)
router.get('/dss-stats', checkAdmin, adminController.getDSSStats)
router.get('/total-users', checkAdmin, adminController.getTotalUsers)
router.get('/history-all', checkAdmin, adminController.getAllHistory)

module.exports = router
