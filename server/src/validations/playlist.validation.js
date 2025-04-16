const { ApiError } = require('@/utils/apiError.utils')
const { StatusCodes } = require('http-status-codes')
const Joi = require('joi')
const { messagePlaylist } = require('@/validations/custom.validation')
const { enumData } = require('@/utils/constants.utils')

const createNewPlaylist = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3)
      .required()
      .messages({
        'string.empty': messagePlaylist.title.required,
        'string.min': messagePlaylist.title.min
      }),
    description: Joi.string().trim().min(3)
      .optional()
      .messages({
        'string.empty': messagePlaylist.description.required,
        'string.min': messagePlaylist.description.min
      }),
    image_url: Joi.string().trim().required().messages({
      'string.empty': messagePlaylist.image_url.required
    }),
    saves: Joi.number()
      .integer()
      .min(0)
      .optional()
      .messages({
        'number.base': messagePlaylist.saves.base,
        'number.integer': messagePlaylist.saves.integer,
        'number.min': messagePlaylist.saves.min
      }),
    genres: Joi.array()
      .items(Joi.string().required())
      .min(1)
      .required()
      .messages({
        'array.min': messagePlaylist.genres.required,
        'any.required': messagePlaylist.genres.required
      }),
    songs: Joi.array()
      .items(Joi.string().required())
      .min(1)
      .required()
      .optional()
      .messages({
        'array.min': messagePlaylist.songs.required,
        'any.required': messagePlaylist.songs.required
      }),
    type: Joi.string().trim().required().valid(...Object.values(enumData.playlistType)).messages({
      'string.empty': messagePlaylist.type.required,
      'any.only': messagePlaylist.type.valid
    }),
    isPublic: Joi.boolean()
      .default(true)
      .optional()
      .messages({
        'boolean.base': messagePlaylist.isPublic.base
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
  createNewPlaylist
}