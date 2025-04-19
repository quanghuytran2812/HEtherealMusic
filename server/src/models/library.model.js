const Joi = require('joi')
const mongoose = require('mongoose')
const { messageLibrary } = require('@/validations/custom.validation')
const { enumData } = require('@/utils/constants.utils')

const librarySchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
      {
        type: { type: String, enum: ['User', 'Album', 'Playlist'] },
        track: { type: mongoose.Schema.Types.ObjectId, refPath: 'items.type' },
        playedAt: { type: Date, default: null },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true, versionKey: false } // createdAt, updatedAt
)

const schema = Joi.object({
  user: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'any.required': messageLibrary.user.required,
      'string.pattern.base': messageLibrary.user.pattern
    }),
  items: Joi.array()
    .items(
      Joi.object({
        track: Joi.string()
          .pattern(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': messageLibrary.track.required,
            'string.pattern.base': messageLibrary.track.pattern
          }),
        type: Joi.string()
          .valid(...Object.values(enumData.libraryType))
          .required()
          .messages({
            'string.empty': messageLibrary.type.required,
            'any.only': messageLibrary.type.invalid
          })
      })
    )
    .required()
    .messages({
      'array.base': messageLibrary.items.base,
      'any.required': messageLibrary.items.required
    })
})
// Indicates which Fields we do not allow to be updated in the Library()
const INVALID_UPDATE_FIELD = ['_id', 'createdAt']
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

const findLibraryByUserId = async (userId) => {

  try {
    const library = await Library.findOne({ user: userId })
      .populate({
        path: 'items.track',
        select: '_id title image_url type artists users songs name imageUrl'
      })
      .select('items')
      .lean()

    if (library) {
      // Step 2: Conditionally populate artists for Album types
      for (const item of library.items) {
        if (item.type === 'Album') {
          // Populate artists for Album
          item.track = await mongoose.model('Album')
            .findById(item.track._id)
            .populate('artists', '_id name') // Populate artists
            .select('_id title image_url artists songs')
            .lean()
        } else if (item.type === 'Playlist') {
          // For Playlist, include artists without populating
          item.track = await mongoose.model('Playlist')
            .findById(item.track._id)
            .populate('users', '_id name') // Populate artists
            .select('_id title image_url users songs type')
            .lean()
        } else if (item.type === 'User') {
          // Filter fields for User
          item.track = {
            _id: item.track._id,
            name: item.track.name,
            imageUrl: item.track.imageUrl
          }
        }
      }
    }
    return library
  } catch (error) {
    throw new Error(error)
  }
}

const trackExistInLibrary = async (userId, trackId, typeItem) => {
  try {
    const library = await Library.findOne({
      user: userId,
      'items.track': trackId,
      'items.type': typeItem
    }).lean()
    return library
  } catch (error) {
    throw new Error(error)
  }
}

const updateLibrary = async (id, data) => {
  try {
    // Remove fields that are not permitted to be modified.
    Object.keys(data).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELD.includes(fieldName)) {
        delete data[fieldName]
      }
    })

    const result = await Library.findByIdAndUpdate(
      { _id: id },
      data,
      { returnDocument: 'after' } // Return result after update
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createNewLibrary,
  findLibraryByUserId,
  trackExistInLibrary,
  updateLibrary
}
