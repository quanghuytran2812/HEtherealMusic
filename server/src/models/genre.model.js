const { messageGenre } = require('@/validations/custom.validation')
const Joi = require('joi')
const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
  parent_id: String,
  genre_name: { type: String, unique: true },
  image_url: String
}, { timestamps: true, versionKey: false })

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
// Indicates which Fields we do not allow to be updated in the updateGenre()
const INVALID_UPDATE_FIELD = ['_id']

const Genre = mongoose.model('Genre', genreSchema)

const validateBeforeSave = async (data) => {
  return await schema.validateAsync(data, { abortEarly: false })
}

const createNewGenre = async (data) => {
  try {
    const validData = await validateBeforeSave(data)
    const createdGenre = await Genre.create(validData)
    return createdGenre
  } catch (error) {
    throw new Error(error)
  }
}

const findGenreByGenreName = async (genreName) => {
  try {
    const genre = await Genre.find({ genre_name: { $regex: genreName, $options: 'i' } })
    return genre
  } catch (error) {
    throw new Error(error)
  }
}

const checkGenresExist = async (data) => {
  try {
    const genres = await Genre.find({ _id: { $in: data } })
    return genres
  } catch (error) {
    throw new Error(error)
  }
}

const findGenreById = async (id) => {
  try {
    const genre = await Genre.findById(id).select('-updatedAt -createdAt').lean()
    return genre
  } catch (error) {
    throw new Error(error)
  }
}

const getAllGenres = async () => {
  try {
    const genres = await Genre.aggregate([
      {
        $group: {
          _id: '$parent_id',
          firstGenre: { $first: { _id: '$_id', genre_name: '$genre_name', image_url: '$image_url' } }
        }
      },
      { $sort: { 'firstGenre.genre_name': 1 } },
      {
        $replaceRoot: { newRoot: '$firstGenre' }
      }
    ])
    return genres
  } catch (error) {
    throw new Error(error)
  }
}

const getRandomGenres = async () => {
  try {
    const randomGenres = await Genre.aggregate([
      { $sample: { size: 2 } },
      { $project: { _id: 1 } }
    ])
    return randomGenres
  } catch (error) {
    throw new Error(error)
  }
}

// Add to your Genre model exports
const searchGenres = async (query, limit = 5) => {
  return await Genre.aggregate([
    { $match: { genre_name: { $regex: query, $options: 'i' } } },
    { $limit: limit },
    { $project: {
      _id: 1,
      genre_name: '$genre_name',
      image_url: 1
    } }
  ])
}

const updateGenre = async (id, data) => {
  try {
    // Remove fields that are not permitted to be modified.
    Object.keys(data).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELD.includes(fieldName)) {
        delete data[fieldName]
      }
    })

    const result = await Genre.findByIdAndUpdate(
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
  createNewGenre,
  findGenreByGenreName,
  updateGenre,
  getAllGenres,
  findGenreById,
  checkGenresExist,
  getRandomGenres,
  searchGenres
}