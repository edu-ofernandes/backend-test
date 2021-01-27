const express = require('express')
const UserCtrl = require('../controller/UserCtrl')

const userRouter = express.Router()

userRouter.get('/users', UserCtrl.allUsers)
userRouter.get('/users/:id', UserCtrl.searchUserId)
userRouter.delete('/users/me', UserCtrl.deleteUserMe)
userRouter.post('/users', UserCtrl.newUser)
userRouter.post('/login', UserCtrl.loginUser)

module.exports = userRouter
