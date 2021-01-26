const express = require('express')
const UserCtrl = require('../controller/UserCtrl')

const router = express.Router()

router.post('/users', UserCtrl.newUser)

/* rout.get('/user', (req, res)=>{return res.json({name:"edu", age: 20})})
rout.get('/user', (req, res)=>{return res.json({name:"edu", age: 20})})
rout.get('/user', (req, res)=>{return res.json({name:"edu", age: 20})})
*/

module.exports = router
