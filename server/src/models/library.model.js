const Joi = require('joi')
const mongoose = require('mongoose')
const { customValidation } = require('@/validations')

const librarySchema = mongoose.Schema(
  {
    users: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['User', 'Album', 'Playlist'] },
    items: [{ type: mongoose.Schema.Types.ObjectId, refPath: 'type' }]
  },
  { timestamps: true, versionKey: false } // createdAt, updatedAt
)

const schema = Joi.object({
  email: Joi.string().required().trim().email().messages({
    'string.empty': customValidation.messages.email.required,
    'string.email': customValidation.messages.email.invalid
  })
})

const Library = mongoose.model('Library', librarySchema)

const validateBeforeSave = async (data) => {
  return await schema.validateAsync(data, { abortEarly: false })
}

const createNewLibrary = async (data) => {
  try {
    const validData = await validateBeforeSave(data)
    const createdLibrary = await Library.create(validData)
    return createdLibrary
  } catch (error) {
    throw new Error(error)
  }
}

const findLibraryById = async (id) => {
  try {
    const playlist = await Library.findById(id)
    return playlist
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createNewLibrary,
  findLibraryById
}