const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')
const verifyToken = require('../middlewares/verifyToken')

// ✅ Auth
router.post('/register', controller.register)
router.post('/login', controller.login)
router.post('/logout', controller.logout)

router.get('/me', verifyToken, controller.getMe)

// ✅ Survey preferensi (butuh login)
router.post('/preferensi', verifyToken, controller.saveSurvey)
router.get('/preferensi/:user_id', verifyToken, controller.getSurvey)

// ✅ Akun
router.patch('/update', verifyToken, controller.updateProfile)
router.patch('/password', verifyToken, controller.changePassword)

// ✅ Rekomendasi
router.get('/rekomendasi/ranking/:user_id', verifyToken, controller.getLatestRanking)

// ✅ Harus di paling bawah karena `/:id` bisa nangkep apa aja
router.get('/:id', verifyToken, controller.getUserById)

module.exports = router
