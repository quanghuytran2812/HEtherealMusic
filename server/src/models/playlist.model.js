const { enumData } = require('@/utils/constants.utils')
const { messagePlaylist } = require('@/validations/custom.validation')
const Joi = require('joi')
const mongoose = require('mongoose')

const playlistSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    image_url: String,
    saves: { type: Number, default: 0 },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    users: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    type: {
      type: String,
      enum: enumData.playlistType,
      default: enumData.playlistType[0]
    },
    isPublic: { type: Boolean, default: true } // 1 for private, 2 for public
  },
  { timestamps: true, versionKey: false } // createdAt, updatedAt
)

const schema = Joi.object({
  title: Joi.string().trim().min(3).required().messages({
    'string.empty': messagePlaylist.title.required,
    'string.min': messagePlaylist.title.min
  }),
  description: Joi.string().trim().min(3).optional().messages({
    'string.empty': messagePlaylist.description.required,
    'string.min': messagePlaylist.description.min
  }),
  image_url: Joi.string().trim().required().messages({
    'string.empty': messagePlaylist.image_url.required
  }),
  saves: Joi.number().integer().min(0).optional().messages({
    'number.base': messagePlaylist.saves.base,
    'number.integer': messagePlaylist.saves.integer,
    'number.min': messagePlaylist.saves.min
  }),
  genres: Joi.array().items(Joi.string()).optional(),
  users: Joi.string().required().messages({
    'string.empty': messagePlaylist.users.required
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
  type: Joi.string()
    .trim()
    .required()
    .valid(...Object.values(enumData.playlistType))
    .messages({
      'string.empty': messagePlaylist.type.required,
      'any.only': messagePlaylist.type.valid
    }),
  isPublic: Joi.boolean().default(true).optional().messages({
    'boolean.base': messagePlaylist.isPublic.base
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
      .select('-updatedAt -createdAt') // Exclude updatedAt, createdAt, type
      .populate({
        path: 'users',
        select: '_id name'
      })
      .populate({
        path: 'songs',
        select: '-updatedAt -createdAt', // Exclude albums and updatedAt, createdAt
        populate: [{
          path: 'artists', // Populate artists for each song
          select: '_id name' // Only select artist names
        },
        {
          path: 'albums', // Populate albums for each song
          select: '_id title' // Only select album title
        }]
      })
      .lean()

    if (!playlist) {
      return null
    }
    return playlist
  } catch (error) {
    throw new Error(error)
  }
}

const findPlaylistByName = async (name) => {
  try {
    const playlist = await Playlist.findOne({ title: name })
    return playlist
  } catch (error) {
    throw new Error(error)
  }
}

const findPlaylistsExist = async (playlistData) => {
  try {
    const playlists = await Playlist.findOne(playlistData)
    return playlists
  } catch (error) {
    throw new Error(error)
  }
}

const findPopularPlaylists = async () => {
  try {
    const popularPlaylists = await Playlist.find({
      type: 'popularPlaylists',
      isPublic: true
    })
      .select('_id title image_url description type songs')
      .sort({ saves: -1 })
      .limit(10)
    return popularPlaylists
  } catch (error) {
    throw new Error(error)
  }
}

const findTopPlaylists = async () => {
  try {
    const topPlaylists = await Playlist.find({
      type: 'topLists',
      isPublic: true
    })
      .select('_id title image_url description type songs')
      .sort({ saves: -1 })
      .limit(10)
    return topPlaylists
  } catch (error) {
    throw new Error(error)
  }
}

// Add to your Playlist model exports
const searchPlaylists = async (query, limit = 5) => {
  return await Playlist.aggregate([
    {
      $match: {
        title: { $regex: query, $options: 'i' },
        isPublic: true
      }
    },
    { $limit: limit },
    { $project: {
      _id: 1,
      title: 1,
      image_url: 1,
      users: 1,
      songs: 1
    } },
    { $lookup: {
      from: 'users',
      localField: 'users',
      foreignField: '_id',
      as: 'users',
      pipeline: [
        { $project: { _id: 1, name: 1 } }
      ]
    } },
    { $addFields: {
      users: { $arrayElemAt: ['$users', 0] } // Convert users array to single object
    } }
  ])
}

const findPlaylistsByGenre = async (genreId, limit = 10, page = 1) => {
  try {
    const skip = (page - 1) * limit

    const playlists = await Playlist.aggregate([
      // Match playlists that contain the genreId
      { $match: { genres: new mongoose.Types.ObjectId(genreId), isPublic: true } },

      // Pagination
      { $skip: skip },
      { $limit: limit },

      // Lookup to populate user details
      {
        $lookup: {
          from: 'users',
          localField: 'users',
          foreignField: '_id',
          as: 'user',
          pipeline: [
            { $project: { _id: 1, name: 1 } }
          ]
        }
      },

      // Convert user array to single object
      { $addFields: { user: { $arrayElemAt: ['$user', 0] } } },

      // Lookup to get song count
      {
        $lookup: {
          from: 'songs',
          localField: 'songs',
          foreignField: '_id',
          as: 'songs'
        }
      },

      // Add songCount field
      { $addFields: { songCount: { $size: '$songs' } } },

      // Project final fields
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          image_url: 1,
          saves: 1,
          type: 1,
          user: 1,
          songCount: 1,
          createdAt: 1
        }
      },

      // Sort by popularity (saves) and recency
      { $sort: { saves: -1, createdAt: -1 } }
    ])

    // Get total count for pagination
    const totalCount = await Playlist.countDocuments({
      genres: new mongoose.Types.ObjectId(genreId),
      isPublic: true
    })

    return {
      playlists,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    }
  } catch (error) {
    throw new Error(error)
  }
}

const removePlaylist = async (id) => {
  try {
    const playlist = await Playlist.findByIdAndDelete(id)
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
      data,
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
  findPlaylistById,
  findPlaylistByName,
  findPopularPlaylists,
  findTopPlaylists,
  searchPlaylists,
  findPlaylistsExist,
  removePlaylist,
  findPlaylistsByGenre
}
