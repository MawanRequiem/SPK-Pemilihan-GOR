const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')

router.post('/register', controller.register)
router.post('/login',controller.login)
router.post('/preferensi', controller.saveSurvey)
router.get('/preferensi/:user_id', controller.getSurvey)
router.get('/:id', controller.getUserById)
router.patch('/update/:id', controller.updateProfile)
router.patch('/password/:id', controller.changePassword)
router.get('/rekomendasi/ranking/:user_id', controller.getLatestRanking)


module.exports = router
