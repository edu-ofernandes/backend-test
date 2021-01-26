const express = require('express')
const UserCtrl = require('../controller/UserCtrl')

const router = express.Router()

router.get('/users', UserCtrl.allUsers)
router.get('/users/:id', UserCtrl.searchUserId)
router.delete('/users/me', UserCtrl.deleteUserMe)
router.post('/users', UserCtrl.newUser)
router.post('/login', UserCtrl.loginUser)

module.exports = router
