const express = require('express')
const UserRouter = require('./router/UserRouter')
const PostRouter = require('./router/PostRouter')

require('./database/Conn')

const app = express()
const port = 3000
app.use(express.json())

app.get('/users', UserRouter)
app.get('/users/:id', UserRouter)
app.delete('/users/me', UserRouter)
app.post('/users', UserRouter)
app.post('/login', UserRouter)

app.post('/post', PostRouter)
app.get('/posts', PostRouter)
app.get('/post/:id', PostRouter)
app.get('/post/search?q:searchTerm', PostRouter)
app.delete('/post/:id', PostRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
