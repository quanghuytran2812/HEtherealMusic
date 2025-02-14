const { StatusCodes } = require('http-status-codes')
const Joi = require('joi')
const ApiError = require('@/utils/ApiError')
const { passwordRegex, messages, validateDob } = require('@/validations/custom.validation')
const { enumData } = require('@/utils/constants')

const createUser = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .trim()
      .email()
      .messages({
        'string.empty': messages.email.required,
        'string.email': messages.email.invalid
      }),
    password: Joi.string()
      .trim()
      .min(10)
      .regex(passwordRegex)
      .messages({
        'string.pattern.base': messages.password.base,
        'string.min': messages.password.min
      }),
    name: Joi.string()
      .required()
      .trim()
      .messages({
        'string.empty': messages.name.required
      }),
    dob: Joi.string()
      .required()
      .trim()
      .custom(validateDob)
      .messages({
        'string.empty': messages.dob.required,
        'any.custom': messages.dob.type,
        'any.invalid': messages.dob.invalid
      }),
    gender: Joi.string()
      .required()
      .valid(...Object.values(enumData.gender))
      .trim()
      .messages({
        'string.empty': messages.gender.required,
        'any.only': messages.gender.invalid
      }),
    imageUrl: Joi.string().trim().optional(),
    verified_email: Joi.boolean().optional()
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

const updateUser = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .strict(),
    current_password: Joi.string()
      .trim()
      .min(10)
      .regex(passwordRegex)
      .messages({
        'string.pattern.base': messages.password.base,
        'string.min': messages.password.min
      }),
    new_password: Joi.string()
      .trim()
      .min(10)
      .regex(passwordRegex)
      .messages({
        'string.pattern.base': messages.password.base,
        'string.min': messages.password.min
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
  createUser,
  updateUser
}