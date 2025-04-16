const { ApiError } = require('@/utils/apiError.utils')
const { StatusCodes } = require('http-status-codes')
const Joi = require('joi')
const { messagePlayer } = require('@/validations/custom.validation')

const createNewPlayer = async (req, res, next) => {
  const schema = Joi.object({
    track: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
      'any.required': messagePlayer.track.required,
      'string.pattern.base': messagePlayer.track.pattern
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
  createNewPlayer
}