const { ApiError } = require('@/utils/apiError.utils')
const { StatusCodes } = require('http-status-codes')
const Joi = require('joi')
const { messageLibrary } = require('@/validations/custom.validation')

const createNewLibrary = async (req, res, next) => {
  const schema = Joi.object({
    track: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
      'any.required': messageLibrary.track.required,
      'string.pattern.base': messageLibrary.track.pattern
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
  createNewLibrary
}