const validator = require('validator')

const postValidation = (Post) => {
  const { title, content } = Post

  if (!title) return { valid: false, log: 'title é obrigatório', statusCode: 400 }
  if (!content) return { valid: false, log: 'content é obrigatório', statusCode: 400 }

  if (validator.isEmpty(title, { ignore_whitespace: true })) return { valid: false, log: 'title não pode ser vazio', statusCode: 400 }
  if (validator.isEmpty(content, { ignore_whitespace: true })) return { valid: false, log: 'content não pode ser vazio', statusCode: 400 }

  return { valid: true, log: '', statusCode: 201 }
}

const jwtValidation = (token) => {
  if (!validator.isJWT(token)) {
    return { valid: false, log: 'token expirado ou inválido', statusCode: 401 }
  }
  return { valid: true, log: '', statusCode: 200 }
}

module.exports = {
  postValidation,
  jwtValidation
}
