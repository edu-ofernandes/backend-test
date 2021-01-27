const validator = require('validator')

const userValidation = (User) => {
  if (!validator.isLength(User.displayName, { min: 8, max: undefined })) {
    return { valid: false, log: `displayName: '${User.displayName}' precisa ser no mínimo 8 caracteres`, statusCode: 400 }
  }
  if (!User.email) {
    return { valid: false, log: 'email é obrigatório', statusCode: 400 }
  }
  if (validator.isEmpty(User.email, { ignore_whitespace: true })) {
    return { valid: false, log: 'email não pode ser vazio', statusCode: 400 }
  }
  if (!validator.isEmail(User.email)) {
    return { valid: false, log: `email: '${User.email}' precisa ser um e-mail válido`, statusCode: 400 }
  }
  if (!User.password) {
    return { valid: false, log: 'password é obrigatório', statusCode: 400 }
  }
  if (validator.isEmpty(User.password, { ignore_whitespace: true })) {
    return { valid: false, log: 'password não pode ser vazio', statusCode: 400 }
  }
  if (!validator.isLength(User.password, { min: 6, max: undefined })) {
    return { valid: false, log: 'password precisa ser no mínimo  6 caracteres', statusCode: 400 }
  }

  return { valid: true, log: '', statusCode: 201 }
}

const userLoginValidation = (User) => {
  if (!User.email) {
    return { valid: false, log: 'email é obrigatório', statusCode: 400 }
  }
  if (validator.isEmpty(User.email, { ignore_whitespace: true })) {
    return { valid: false, log: 'email não pode ser vazio', statusCode: 400 }
  }
  if (!validator.isEmail(User.email)) {
    return { valid: false, log: `email: '${User.email}' precisa ser um e-mail válido`, statusCode: 400 }
  }
  if (!User.password) {
    return { valid: false, log: 'password é obrigatório', statusCode: 400 }
  }
  if (validator.isEmpty(User.password, { ignore_whitespace: true })) {
    return { valid: false, log: 'password não pode ser vazio', statusCode: 400 }
  }

  return { valid: true, log: '', statusCode: 200 }
}

const jwtValidation = (token) => {
  if (!validator.isJWT(token)) return { valid: false, log: 'token expirado ou inválido', statusCode: 401 }

  return { valid: true, log: '', statusCode: 200 }
}

module.exports = {
  userValidation,
  userLoginValidation,
  jwtValidation
}
