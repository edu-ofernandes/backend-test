const express = require('express')
const PostCtrl = require('../controller/PostCtrl')

const postRouter = express.Router()

postRouter.post('/post', PostCtrl.newPost)
postRouter.get('/posts', PostCtrl.allPosts)
postRouter.get('/post/:id', PostCtrl.searchPostId)
postRouter.put('/post/:id', PostCtrl.updatePost)
postRouter.get('/post/search?q=searchTerm', PostCtrl.searchPostTerm)
postRouter.delete('/post/:id', PostCtrl.deletePost)

module.exports = postRouter
