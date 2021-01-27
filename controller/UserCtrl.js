const UserModel = require('../models/User')
const UserValidation = require('../utils/UserValidation')
const jwt = require('jsonwebtoken')
const S_KEY = '123456'

const userExistsByEmail = async (email) => {
  return await UserModel.count({ where: { email } })
}
const userExistsById = async (id) => {
  return await UserModel.count({ where: { id } })
}

const newUser = async (req, res) => {
  const { displayName, email, password, image } = req.body

  const UserValid = UserValidation.userValidation(req.body)

  if (!UserValid.valid) return res.status(UserValid.statusCode).json({ message: UserValid.log, statusCode: UserValid.statusCode })

  if (await userExistsByEmail(email) > 0) return res.status(409).json({ message: 'Usuário já existe', statusCode: 409 })

  const user = await UserModel.create({ displayName, email, password, image })

  const token = jwt.sign({ userId: user.id }, S_KEY)

  return res.status(UserValid.statusCode).json({ token, statusCode: UserValid.statusCode })
}

const allUsers = async (req, res) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'token não encontrado', statusCode: 401 })

  const tokenValid = UserValidation.jwtValidation(req.headers.authorization)

  if (!tokenValid.valid) return res.status(tokenValid.statusCode).json({ message: tokenValid.log, statusCode: tokenValid.statusCode })

  const tokenDecoded = jwt.verify(req.headers.authorization, S_KEY)

  if (await UserModel.count({ where: { id: tokenDecoded.userId } }) === 0) return res.status(401).json({ message: 'token expirado ou inválido', statusCode: 401 })

  const users = await UserModel.findAll({ attributes: ['id', 'displayName', 'email', 'image'] })

  return res.status(200).json(users)
}
const deleteUserMe = async (req, res) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'token não encontrado', statusCode: 401 })

  const tokenValid = UserValidation.jwtValidation(req.headers.authorization)

  if (!tokenValid.valid) return res.status(tokenValid.statusCode).json({ message: tokenValid.log, statusCode: tokenValid.statusCode })

  const tokenDecoded = jwt.verify(req.headers.authorization, S_KEY)

  if (await UserModel.count({ where: { id: tokenDecoded.userId } }) === 0) return res.status(401).json({ message: 'token expirado ou inválido', statusCode: 401 })

  if (await UserModel.destroy({ where: { id: tokenDecoded.userId } })) return res.status(204).json({ statusCode: 204 })
}
const searchUserId = async (req, res) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'token não encontrado', statusCode: 401 })

  const tokenValid = UserValidation.jwtValidation(req.headers.authorization)

  if (!tokenValid.valid) return res.status(tokenValid.statusCode).json({ message: tokenValid.log, statusCode: tokenValid.statusCode })

  const tokenDecoded = jwt.verify(req.headers.authorization, S_KEY)

  if (await UserModel.count({ where: { id: tokenDecoded.userId } }) === 0) return res.status(401).json({ message: 'token expirado ou inválido', statusCode: 401 })

  const userId = req.params.id

  const userById = await UserModel.findOne({ where: { id: userId } })

  if (userById === null) return res.status(404).json({ message: 'usuário não existe', statusCode: 404 })

  return res.status(200).json(userById)
}

const loginUser = async (req, res) => {
  const { email, password } = req.body

  const UserValid = UserValidation.userLoginValidation(req.body)

  if (!UserValid.valid) return res.status(UserValid.statusCode).json({ message: UserValid.log, statusCode: UserValid.satusCode })

  const userLogin = await UserModel.findOne({ where: { email, password } })

  if (userLogin === null) return res.status(400).json({ message: 'E-mail ou senha inválidos', statusCode: 400 })

  const token = jwt.sign({ userId: userLogin.dataValues.id }, '123456')

  return res.status(200).json({ token, statusCode: UserValid.statusCode })
}

module.exports = {
  newUser,
  allUsers,
  deleteUserMe,
  searchUserId,
  loginUser,
  userExistsByEmail,
  userExistsById
}
