// File: routes/history.js
const express = require('express')
const router = express.Router()
const historyCtrl = require('../controllers/historyController')

router.get('/:user_id', historyCtrl.getHistory)

module.exports = router
