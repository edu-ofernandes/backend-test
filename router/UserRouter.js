const express = require('express')
const UserCtrl = require('../controller/UserCtrl')

const rout = express.Router()

rout.get('/user', (req, res)=>{return res.json({name:"edu", age: 20})})

module.exports = rout