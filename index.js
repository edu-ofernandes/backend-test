const express = require('express')
const UserRouter = require('./router/UserRouter')
const app = express()
const port = 3000

app.use(express.json())

app.get('/user', UserRouter)

app.listen(port, ()=>{
  console.log(`Example app listening at http://localhost:${port}`)
})