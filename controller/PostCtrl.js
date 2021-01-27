const PostModel = require('../models/Post')
const UserCtrl = require('../controller/UserCtrl')
const PostValidation = require('../utils/PostValidation')
const jwt = require('jsonwebtoken')
const S_KEY = '123456'

const newPost = async (req, res) => {
  const PostValid = PostValidation.postValidation(req.body)

  if (!PostValid.valid) return res.status(PostValid.statusCode).json({ message: PostValid.log, statusCode: PostValid.statusCode })

  if (!req.headers.authorization) return res.status(401).json({ message: 'token não encontrado', statusCode: 401 })

  const tokenValid = PostValidation.jwtValidation(req.headers.authorization)

  if (!tokenValid.valid) return res.status(tokenValid.statusCode).json({ message: tokenValid.log, statusCode: tokenValid.statusCode })

  const tokenDecoded = jwt.verify(req.headers.authorization, S_KEY)

  if (UserCtrl.userExistsById(tokenDecoded.userId) > 0) return res.status(401).json({ message: 'token expirado ou inválido', statusCode: 401 })

  const data = {
    title: req.body.title,
    content: req.body.content,
    userId: tokenDecoded.userId
  }

  const post = await PostModel.create(data)

  return res.status(201).json({ title: post.dataValues.title, content: post.dataValues.content, userId: post.dataValues.userId })
}

const allPosts = async (req, res) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'token não encontrado', statusCode: 401 })

  const tokenValid = PostValidation.jwtValidation(req.headers.authorization)

  if (!tokenValid.valid) return res.status(tokenValid.statusCode).json({ message: tokenValid.log, statusCode: tokenValid.statusCode })

  const tokenDecoded = jwt.verify(req.headers.authorization, S_KEY)

  if (UserCtrl.userExistsById(tokenDecoded.userId) > 0) {
    return res.status(401).json({ message: 'token expirado ou inválido', statusCode: 401 })
  }

  const posts = await PostModel.findAll({ include: { association: 'user', attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } }, order: [['id', 'ASC']] })

  return res.status(200).json(posts)
}

const searchPostId = async (req, res) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'token não encontrado', statusCode: 401 })

  const tokenValid = PostValidation.jwtValidation(req.headers.authorization)

  if (!tokenValid.valid) return res.status(tokenValid.statusCode).json({ message: tokenValid.log, statusCode: tokenValid.statusCode })

  const tokenDecoded = jwt.verify(req.headers.authorization, S_KEY)

  if (UserCtrl.userExistsById(tokenDecoded.userId) > 0) {
    return res.status(401).json({ message: 'token expirado ou inválido', statusCode: 401 })
  }

  const postId = req.params.id

  const post = await PostModel.findByPk(postId, { include: { association: 'user', attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } } })

  if (!post) return res.status(404).json({ message: 'Post não existe', statusCode: 404 })

  return res.status(200).json(post)
}

const updatePost = async (req, res) => {
  const PostValid = PostValidation.postValidation(req.body)

  if (!PostValid.valid) return res.status(PostValid.statusCode).json({ message: PostValid.log, statusCode: PostValid.statusCode })

  if (!req.headers.authorization) return res.status(401).json({ message: 'token não encontrado', statusCode: 401 })

  const tokenValid = PostValidation.jwtValidation(req.headers.authorization)

  if (!tokenValid.valid) return res.status(tokenValid.statusCode).json({ message: tokenValid.log, statusCode: tokenValid.statusCode })

  const tokenDecoded = jwt.verify(req.headers.authorization, S_KEY)

  if (UserCtrl.userExistsById(tokenDecoded.userId) > 0) return res.status(401).json({ message: 'token expirado ou inválido', statusCode: 401 })

  const postId = req.params.id

  const post = await PostModel.findByPk(postId, { include: { association: 'user', attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } } })

  if (!post) return res.status(404).json({ message: 'Post não existe', statusCode: 404 })

  if (post.dataValues.userId !== tokenDecoded.userId) return res.status(401).json({ message: 'Usuário não autorizado', statusCode: 401 })

  const dataUpdated = {
    title: req.body.title,
    content: req.body.content,
    userId: post.dataValues.userId
  }

  await PostModel.update(dataUpdated, { where: { id: postId } })

  return res.status(200).json(dataUpdated)
}

/* const searchPostTerm = async (req, res) => {
  console.log(req)
  if (!req.headers.authorization) return res.status(401).json({ message: 'token não encontrado', statusCode: 401 })

  const tokenValid = PostValidation.jwtValidation(req.headers.authorization)

  if (!tokenValid.valid) return res.status(tokenValid.statusCode).json({ message: tokenValid.log, statusCode: tokenValid.statusCode })

  const tokenDecoded = jwt.verify(req.headers.authorization, S_KEY)

  if (UserCtrl.userExistsById(tokenDecoded.userId) > 0) return res.status(401).json({ message: 'token expirado ou inválido', statusCode: 401 })

  return res.status().json({})
} */

const deletePost = async (req, res) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'token não encontrado', statusCode: 401 })

  const tokenValid = PostValidation.jwtValidation(req.headers.authorization)

  if (!tokenValid.valid) return res.status(tokenValid.statusCode).json({ message: tokenValid.log, statusCode: tokenValid.statusCode })

  const tokenDecoded = jwt.verify(req.headers.authorization, S_KEY)

  if (UserCtrl.userExistsById(tokenDecoded.userId) > 0) return res.status(401).json({ message: 'token expirado ou inválido', statusCode: 401 })

  const postId = req.params.id

  const post = await PostModel.findByPk(postId, { include: { association: 'user', attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } } })

  if (!post) return res.status(404).json({ message: 'Post não existe', statusCode: 404 })

  if (post.dataValues.userId !== tokenDecoded.userId) return res.status(401).json({ message: 'Usuário não autorizado', statusCode: 401 })

  await PostModel.destroy({ where: { id: postId } })

  return res.status(204).json({ statusCode: 204 })
}

module.exports = {
  newPost,
  allPosts,
  searchPostId,
  updatePost,
  // searchPostTerm,
  deletePost
}
