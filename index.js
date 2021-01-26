const express = require('express')
const UserRouter = require('./router/UserRouter')

require('./database/Conn')

const app = express()
const port = 3000
app.use(express.json())

app.get('/users', UserRouter)
app.get('/users/:id', UserRouter)
app.delete('/users/me', UserRouter)
app.post('/users', UserRouter)
app.post('/login', UserRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
