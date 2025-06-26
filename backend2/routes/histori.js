// File: routes/history.js
const express = require('express')
const router = express.Router()
const historyCtrl = require('../controllers/historyController')
const verifyToken = require('../middlewares/verifyToken')

router.get('/:user_id',verifyToken , historyCtrl.getHistory)

module.exports = router
