const { ApiError } = require('@/utils/apiError.utils')
const { StatusCodes } = require('http-status-codes')
const Joi = require('joi')
const { messageSong } = require('./custom.validation')
const { enumData } = require('@/utils/constants.utils')

const createNewSong = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().trim().required().min(3).messages({
      'string.empty': messageSong.title.required,
      'string.min': messageSong.title.min
    }),
    duration: Joi.number()
      .integer()
      .min(0)
      .required()
      .messages({
        'number.base': messageSong.duration.base,
        'number.integer': messageSong.duration.integer,
        'number.min': messageSong.duration.min,
        'any.required': messageSong.duration.required
      }),
    isExplicit: Joi.boolean().optional(),
    type: Joi.string().trim().required().valid(...Object.values(enumData.songType)).messages({
      'string.empty': messageSong.type.required,
      'any.only': messageSong.type.valid
    }),
    artists: Joi.array()
      .items(Joi.string().required())
      .min(1)
      .required()
      .messages({
        'array.min': messageSong.artists.required,
        'any.required': messageSong.artists.required
      }),
    albums: Joi.string()
      .required()
      .messages({
        'string.empty': messageSong.albums.required
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
  createNewSong
}