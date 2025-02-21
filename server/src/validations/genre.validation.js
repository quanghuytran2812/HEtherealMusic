const { ApiError } = require('@/utils/apiError.utils')
const { StatusCodes } = require('http-status-codes')
const Joi = require('joi')
const { messageGenre } = require('./custom.validation')

const createNewGenre = async (req, res, next) => {
  const schema = Joi.object({
    parent_id: Joi.string().trim().required().messages({
      'string.empty': messageGenre.parent_id.required
    }),
    genre_name: Joi.string().trim().required().min(3).messages({
      'string.empty': messageGenre.genre_name.required,
      'string.min': messageGenre.genre_name.min
    }),
    image_url: Joi.string().trim().required().optional().messages({
      'string.empty': messageGenre.image_url.required
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
  createNewGenre
}