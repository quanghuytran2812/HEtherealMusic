const { StatusCodes } = require('http-status-codes')
const Joi = require('joi')
const { passwordRegex, messages } = require('@/validations/custom.validation')
const { ApiError } = require('@/utils/apiError.utils')
const { enumData } = require('@/utils/constants.utils')

const login = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().trim().required().email().messages({
      'string.empty': messages.email.required,
      'string.email': messages.email.invalid
    }),
    password: Joi.string().trim().required().min(10).regex(passwordRegex).optional().messages({
      'string.empty': messages.password.required,
      'string.pattern.base': messages.password.base,
      'string.min': messages.password.min
    }),
    typeLogin: Joi.string().trim().required().valid(...Object.values(enumData.loginType)).messages({
      'string.empty': messages.typeLogin.required,
      'any.only': messages.typeLogin.invalid
    })
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(
      new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        error.details.map((err) => err.message).join(', ')
      )
    )
  }
}

const verifyAccount = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().trim().required().email().messages({
      'string.empty': messages.email.required,
      'string.email': messages.email.invalid
    }),
    token: Joi.string()
      .required()
      .messages({
        'string.empty': messages.token.required,
        'string.base': messages.token.invalid
      })
  })
  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(
      new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        error.details.map((err) => err.message).join(', ')
      )
    )
  }
}

module.exports = {
  login,
  verifyAccount
}