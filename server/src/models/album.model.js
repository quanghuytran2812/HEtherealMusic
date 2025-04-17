const { enumData } = require('@/utils/constants.utils')
const { messageAlbum } = require('@/validations/custom.validation')
const Joi = require('joi')
const mongoose = require('mongoose')

const albumSchema = mongoose.Schema(
  {
    title: String,
    image_url: String,
    type: {
      type: String,
      enum: enumData.albumType,
      default: enumData.albumType[0]
    }, // 1 for single, 2 for album
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
  type: Joi.string()
    .trim()
    .required()
    .valid(...Object.values(enumData.albumType))
    .messages({
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
      .populate({
        path: 'artists',
        select: '_id name'
      })
      .populate({
        path: 'songs',
        select: '-albums -updatedAt -createdAt', // Exclude albums and updatedAt, createdAt
        populate: {
          path: 'artists', // Populate artists for each song
          select: '_id name' // Only select artist names
        }
      })
      .lean()

    if (!album) {
      return null
    }

    return {
      _id: album._id,
      title: album.title,
      image_url: album.image_url,
      type: album.type,
      artists: album.artists,
      songs: album.songs.map((song) => ({
        ...song,
        artists: song.artists
      })),
      createdAt: album.createdAt
    }
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

const findNewReleaseAlbums = async () => {
  try {
    const currentDate = new Date()
    const thirtyDaysAgo = new Date(
      currentDate.setDate(currentDate.getDate() - 30)
    )

    const newReleases = await Album.find({
      createdAt: { $gte: thirtyDaysAgo }
    })
      .select('_id title image_url artists songs')
      .populate({
        path: 'artists',
        select: '_id name'
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()

    return newReleases
  } catch (error) {
    throw new Error(error)
  }
}

const findAllAlbumsByArtist = async (artistId) => {
  try {
    const albums = await Album.find({ artists: artistId })
      .populate('artists', 'name')
      .lean()
    return albums.map((album) => ({
      _id: album._id,
      title: album.title,
      image_url: album.image_url,
      songs: album.songs,
      createdAt: album.createdAt
    }))
  } catch (error) {
    throw new Error(error)
  }
}

const findRecommendAlbums = async (artistIds, genres, trackIds) => {
  try {
    // Find albums based on seed artists, genres, and tracks
    const recommendations = await Album.find({
      $or: [
        { artists: { $in: artistIds.map(id => id) } },
        { genres: { $in: genres.map(id => id) } },
        { songs: { $in: trackIds.map(id => id) } }
      ]
    })
      .select('_id title image_url artists songs')
      .populate({
        path: 'artists',
        select: '_id name'
      })
      .limit(5)
      .exec()

    return recommendations
  } catch (error) {
    throw new Error(error)
  }
}

// Add to your Album model exports
const searchAlbums = async (query, limit = 5) => {
  return await Album.aggregate([
    { $match: { title: { $regex: query, $options: 'i' } } },
    { $limit: limit },
    { $project: { _id: 1, title: 1, image_url: 1, artists: 1, songs: 1, createdAt: 1 } },
    { $lookup: {
      from: 'users',
      localField: 'artists',
      foreignField: '_id',
      as: 'artists',
      pipeline: [
        { $project: { _id: 1, name: 1 } }
      ]
    } }
  ])
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
  findAlbumById,
  findNewReleaseAlbums,
  findAllAlbumsByArtist,
  findRecommendAlbums,
  searchAlbums
}
