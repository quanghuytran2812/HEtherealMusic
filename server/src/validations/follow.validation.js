const { ApiError } = require('@/utils/apiError.utils')
const { StatusCodes } = require('http-status-codes')
const Joi = require('joi')
const { messageFollow } = require('./custom.validation')

const createNewFollow = async (req, res, next) => {
  const schema = Joi.object({
    followerId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'any.required': messageFollow.followed_user_id.required,
        'string.pattern.base': messageFollow.followed_user_id.pattern
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
  createNewFollow
}