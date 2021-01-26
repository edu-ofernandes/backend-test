const express = require('express')
const UserRouter = require('./router/UserRouter')
require('./database/Conn')

const app = express()
const port = 3000
app.use(express.json())

// app.get('/user', UserRouter);
// app.delete('/user/me', UserRouter);
// app.get(`/user/${id}`, UserRouter);
app.post('/users', UserRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
