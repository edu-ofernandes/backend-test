const UserModel = require('../models/User')
const UserValidation = require('../utils/UserValidation')
const jwt = require('jsonwebtoken')
const S_KEY = '123456'

const newUser = async (req, res) => {
  const { displayName, email, password, image } = req.body

  const UserValid = UserValidation.userValidation(req.body)

  if (!UserValid.valid) return res.json({ message: UserValid.log, statusCode: UserValid.satusCode })

  if (await userExists(email) > 0) return res.json({ message: 'Usuário já existe', statusCode: 409 })

  const user = await UserModel.create({ displayName, email, password, image })

  const token = jwt.sign({ userId: user.id }, S_KEY)

  return res.json({ token, statusCode: UserValid.statusCode })
}

const allUsers = async (req, res) => {
  if (!req.headers.authorization) return res.json({ message: 'token não encontrado', statusCode: 401 })

  const tokenValid = UserValidation.jwtValidation(req.headers.authorization)

  if (!tokenValid.valid) return res.json({ message: tokenValid.log, statusCode: tokenValid.statusCode })

  const tokenDecoded = jwt.verify(req.headers.authorization, S_KEY)

  if (await UserModel.count({ where: { id: tokenDecoded.userId } }) === 0) {
    return res.json({ message: 'token expirado ou inválido', statusCode: 401 })
  }

  const users = await UserModel.findAll({ attributes: ['id', 'displayName', 'email', 'image'] })

  return res.json(users)
}
const deleteUserMe = async (req, res) => {
  if (!req.headers.authorization) return res.json({ message: 'token não encontrado', statusCode: 401 })

  const tokenValid = UserValidation.jwtValidation(req.headers.authorization)

  if (!tokenValid.valid) return res.json({ message: tokenValid.log, statusCode: tokenValid.statusCode })

  const tokenDecoded = jwt.verify(req.headers.authorization, S_KEY)

  if (await UserModel.count({ where: { id: tokenDecoded.userId } }) === 0) {
    return res.json({ message: 'token expirado ou inválido', statusCode: 401 })
  }

  if (await UserModel.destroy({ where: { id: tokenDecoded.userId } })) return res.json({ statusCode: 204 })
}
const searchUserId = async (req, res) => {
  if (!req.headers.authorization) return res.json({ message: 'token não encontrado', statusCode: 401 })

  const tokenValid = UserValidation.jwtValidation(req.headers.authorization)

  if (!tokenValid.valid) return res.json({ message: tokenValid.log, statusCode: tokenValid.statusCode })

  const tokenDecoded = jwt.verify(req.headers.authorization, S_KEY)

  if (await UserModel.count({ where: { id: tokenDecoded.userId } }) === 0) {
    return res.json({ message: 'token expirado ou inválido', statusCode: 401 })
  }

  const userId = req.params.id

  const userById = await UserModel.findOne({ where: { id: userId } })

  if (userById === null) return res.json({ message: 'usuário não existe', statusCode: 401 })

  return res.json(userById)
}

const loginUser = async (req, res) => {
  const { email, password } = req.body

  const UserValid = UserValidation.userLoginValidation(req.body)

  if (!UserValid.valid) return res.json({ message: UserValid.log, statusCode: UserValid.satusCode })

  const userLogin = await UserModel.findOne({ where: { email, password } })

  if (userLogin === null) return res.json({ message: 'E-mail ou senha inválidos', statusCode: 400 })

  const token = jwt.sign({ userId: userLogin.dataValues.id }, '123456')

  return res.json({ token, statusCode: UserValid.statusCode })
}

const userExists = async (email) => {
  return await UserModel.count({ where: { email } })
}

module.exports = {
  newUser,
  allUsers,
  deleteUserMe,
  searchUserId,
  loginUser
}
