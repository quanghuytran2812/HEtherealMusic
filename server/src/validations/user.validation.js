const { StatusCodes } = require('http-status-codes')
const Joi = require('joi')
const {
  passwordRegex,
  messages,
  validateDob
} = require('@/validations/custom.validation')
const { enumData } = require('@/utils/constants.utils')
const { ApiError } = require('@/utils/apiError.utils')

const createUser = async (req, res, next) => {
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
    name: Joi.string().trim().required().min(3).max(30).messages({
      'string.empty': messages.name.required,
      'string.min': messages.name.min,
      'string.max': messages.name.max
    }),
    dob: Joi.string().trim().required().custom(validateDob).messages({
      'string.empty': messages.dob.required,
      'any.custom': messages.dob.type,
      'any.invalid': messages.dob.invalid
    }),
    gender: Joi.string().trim().required().valid(...Object.values(enumData.gender)).messages({
      'string.empty': messages.gender.required,
      'any.only': messages.gender.invalid
    }),
    imageUrl: Joi.string().optional(),
    verified_email: Joi.boolean().optional().messages({
      'boolean.base': messages.verified_email.invalid,
      'any.only': messages.verified_email.notBoolean
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

const updateUser = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().required().min(3).max(30).optional().messages({
      'string.empty': messages.name.required,
      'string.min': messages.name.min,
      'string.max': messages.name.max
    }),
    current_password: Joi.string().trim().required().min(10).regex(passwordRegex).optional().messages({
      'string.empty': messages.password.required,
      'string.pattern.base': messages.password.base,
      'string.min': messages.password.min
    }),
    new_password: Joi.string().trim().required().min(10).regex(passwordRegex).optional().messages({
      'string.empty': messages.password.required,
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
