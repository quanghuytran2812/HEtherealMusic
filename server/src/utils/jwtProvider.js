const jwt = require('jsonwebtoken')

const generateToken = async (userInfo, secretSignature, tokenLifetime) => {
  try {
    return jwt.sign(userInfo, secretSignature, {
      algorithm: 'HS256',
      expiresIn: tokenLifetime
    })
  } catch (error) {
    throw new Error(error)
  }
}

const verifyToken = async (token, secretSignature) => {
  try {
    return jwt.verify(token, secretSignature)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { generateToken, verifyToken }
