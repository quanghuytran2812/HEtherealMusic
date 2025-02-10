const { StatusCodes } = require('http-status-codes')
const Joi = require('joi')
const ApiError = require('@/utils/ApiError')
const { passwordRegex, messages } = require('@/validations/custom.validation')

const login = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().trim().email().messages({
      'string.empty': messages.email.required,
      'string.email': messages.email.invalid
    }),
    password: Joi.string()
      .required()
      .trim()
      .min(10)
      .regex(passwordRegex)
      .optional()
      .messages({
        'string.empty': messages.password.required,
        'string.pattern.base': messages.password.base,
        'string.min': messages.password.min
      }),
    typeLogin: Joi.string().required()
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
    email: Joi.string().required().trim().email().messages({
      'string.empty': messages.email.required,
      'string.email': messages.email.invalid
    }),
    token: Joi.string().required()
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
