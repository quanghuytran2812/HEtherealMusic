const { enumData } = require('@/utils/constants.utils')
const { messageAlbum } = require('@/validations/custom.validation')
const Joi = require('joi')
const mongoose = require('mongoose')

const albumSchema = mongoose.Schema(
  {
    title: String,
    image_url: String,
    type: { type: String, enum: enumData.albumType, default: enumData.albumType[0] }, // 1 for single, 2 for album
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    artists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
  },
  { timestamps: true, versionKey: false } // createdAt, updatedAt
)

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
// Indicates which Fields we do not allow to be updated in the Album()
const INVALID_UPDATE_FIELD = ['_id', 'createdAt']

const Album = mongoose.model('Album', albumSchema)

const validateBeforeSave = async (data) => {
  return await schema.validateAsync(data, { abortEarly: false })
}

const createNewAlbum = async (data) => {
  try {
    const validData = await validateBeforeSave(data)
    const createdAlbum = await Album.create(validData)
    return createdAlbum
  } catch (error) {
    throw new Error(error)
  }
}

const findAlbumById = async (id) => {
  try {
    const album = await Album.findById(id)
    return album
  } catch (error) {
    throw new Error(error)
  }
}

const findAlbumByIdAndUpdate = async (albums, song) => {
  try {
    const album = await Album.findByIdAndUpdate(
      albums,
      { $addToSet: { songs: song._id } }, // Use $addToSet to avoid duplicates
      { new: true }
    )
    return album
  } catch (error) {
    throw new Error(error)
  }
}

const updateAlbum = async (id, data) => {
  try {
    // Remove fields that are not permitted to be modified.
    Object.keys(data).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELD.includes(fieldName)) {
        delete data[fieldName]
      }
    })

    const result = await Album.findByIdAndUpdate(
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
  createNewAlbum,
  updateAlbum,
  findAlbumByIdAndUpdate,
  findAlbumById
}