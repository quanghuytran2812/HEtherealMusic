const { ApiError } = require('@/utils/apiError.utils')
const { StatusCodes } = require('http-status-codes')
const Joi = require('joi')
const { messageAlbum } = require('./custom.validation')
const { enumData } = require('@/utils/constants.utils')

const createNewAlbum = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().trim().required().min(3).messages({
      'string.empty': messageAlbum.title.required,
      'string.min': messageAlbum.title.min
    }),
    image_url: Joi.string().trim().required().messages({
      'string.empty': messageAlbum.image_url.required
    }),
    type: Joi.string().trim().required().valid(...Object.values(enumData.albumType)).messages({
      'string.empty': messageAlbum.type.required,
      'any.only': messageAlbum.type.valid
    }),
    genres: Joi.array()
      .items(Joi.string().required())
      .min(1)
      .required()
      .messages({
        'array.min': messageAlbum.genres.required,
        'any.required': messageAlbum.genres.required
      }),
    artists: Joi.array()
      .items(Joi.string().required())
      .min(1)
      .required()
      .messages({
        'array.min': messageAlbum.artists.required,
        'any.required': messageAlbum.artists.required
      }),
    songs: Joi.array()
      .items(Joi.string().required())
      .min(1)
      .required()
      .optional()
      .messages({
        'array.min': messageAlbum.songs.required,
        'any.required': messageAlbum.songs.required
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
  createNewAlbum
}