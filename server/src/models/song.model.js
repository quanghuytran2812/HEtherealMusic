const { enumData } = require('@/utils/constants.utils')
const { messageSong } = require('@/validations/custom.validation')
const Joi = require('joi')
const mongoose = require('mongoose')

const songSchema = mongoose.Schema(
  {
    title: String,
    image_url: String,
    audio_url: String,
    duration: Number,
    popularity: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    isExplicit: { type: Boolean, default: false },
    type: { type: String, enum: enumData.songType, default: enumData.songType[0] },
    artists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    albums: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' }
  },
  { timestamps: true, versionKey: false } // createdAt, updatedAt
)

const schema = Joi.object({
  title: Joi.string().trim().required().min(3).messages({
    'string.empty': messageSong.title.required,
    'string.min': messageSong.title.min
  }),
  image_url: Joi.string().trim().required().messages({
    'string.empty': messageSong.image_url.required
  }),
  audio_url: Joi.string().trim().required().messages({
    'string.empty': messageSong.audio_url.required
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
// Indicates which Fields we do not allow to be updated in the Song()
const INVALID_UPDATE_FIELD = ['_id', 'createdAt']

const Song = mongoose.model('Song', songSchema)

const validateBeforeSave = async (data) => {
  return await schema.validateAsync(data, { abortEarly: false })
}

const createNewSong = async (data) => {
  try {
    const validData = await validateBeforeSave(data)
    const createdSong = await Song.create(validData)

    return createdSong
  } catch (error) {
    throw new Error(error)
  }
}

const findSongById = async (id) => {
  try {
    const song = await Song.findById(id)
    return song
  } catch (error) {
    throw new Error(error)
  }
}

const updateSong = async (id, data) => {
  try {
    // Remove fields that are not permitted to be modified.
    Object.keys(data).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELD.includes(fieldName)) {
        delete data[fieldName]
      }
    })

    const result = await Song.findByIdAndUpdate(
      { _id: id },
      { $set: data },
      { returnDocument: 'after' } // Return result after update
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createNewSong,
  updateSong,
  findSongById
}