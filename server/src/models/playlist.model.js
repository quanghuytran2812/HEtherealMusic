const Joi = require('joi')
const mongoose = require('mongoose')
const { customValidation } = require('@/validations')

const playlistSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    image_url: String,
    saves: { type: Number, default: 0 },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    users: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    isPublic: { type: Boolean, default: true } // 1 for private, 2 for public
  },
  { timestamps: true, versionKey: false } // createdAt, updatedAt
)

const schema = Joi.object({
  email: Joi.string().required().trim().email().messages({
    'string.empty': customValidation.messages.email.required,
    'string.email': customValidation.messages.email.invalid
  })
})
// Indicates which Fields we do not allow to be updated in the Playlist()
const INVALID_UPDATE_FIELD = ['_id', 'createdAt']

const Playlist = mongoose.model('Playlist', playlistSchema)

const validateBeforeSave = async (data) => {
  return await schema.validateAsync(data, { abortEarly: false })
}

const createNewPlaylist = async (data) => {
  try {
    const validData = await validateBeforeSave(data)
    const createdPlaylist = await Playlist.create(validData)
    return createdPlaylist
  } catch (error) {
    throw new Error(error)
  }
}

const findPlaylistById = async (id) => {
  try {
    const playlist = await Playlist.findById(id)
    return playlist
  } catch (error) {
    throw new Error(error)
  }
}

const updatePlaylist = async (id, data) => {
  try {
    // Remove fields that are not permitted to be modified.
    Object.keys(data).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELD.includes(fieldName)) {
        delete data[fieldName]
      }
    })

    const result = await Playlist.findByIdAndUpdate(
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
  createNewPlaylist,
  updatePlaylist,
  findPlaylistById
}