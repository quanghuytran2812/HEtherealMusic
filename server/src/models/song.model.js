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
    type: {
      type: String,
      enum: enumData.songType,
      default: enumData.songType[0]
    },
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
  duration: Joi.number().integer().min(0).required().messages({
    'number.base': messageSong.duration.base,
    'number.integer': messageSong.duration.integer,
    'number.min': messageSong.duration.min,
    'any.required': messageSong.duration.required
  }),
  isExplicit: Joi.boolean().optional(),
  type: Joi.string()
    .trim()
    .required()
    .valid(...Object.values(enumData.songType))
    .messages({
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
  albums: Joi.string().required().messages({
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
      .populate({
        path: 'artists',
        select: '_id name imageUrl'
      })
      .populate('albums', '_id title createdAt')
      .select('-updatedAt')
      .lean()
    return {
      ...song,
      artists: song.artists.map((artist) => ({
        _id: artist._id,
        name: artist.name,
        image_url: artist.imageUrl[artist.imageUrl.length - 1]
      }))
    }
  } catch (error) {
    throw new Error(error)
  }
}

const checkSongsExist = async (songIds) => {
  try {
    const songs = await Song.find({ _id: { $in: songIds } })
    return songs
  } catch (error) {
    throw new Error(error)
  }
}

const getRandomSongs = async () => {
  try {
    const randomSongs = await Song.aggregate([
      { $sample: { size: 2 } },
      { $project: { _id: 1 } }
    ])
    return randomSongs
  } catch (error) {
    throw new Error(error)
  }
}

// Add to your Song model exports
const searchSongs = async (query, limit = 4) => {
  return await Song.aggregate([
    { $match: { title: { $regex: query, $options: 'i' } } },
    { $limit: limit },
    {
      $project: {
        _id: 1,
        title: 1,
        image_url: 1,
        artists: 1,
        duration: 1,
        albums: 1
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'artists',
        foreignField: '_id',
        as: 'artists',
        pipeline: [{ $project: { _id: 1, name: 1 } }]
      }
    },
    {
      $lookup: {
        from: 'albums',
        localField: 'albums',
        foreignField: '_id',
        as: 'albums',
        pipeline: [{ $project: { _id: 1, title: 1 } }]
      }
    },
    {
      $addFields: {
        albums: { $arrayElemAt: ['$albums', 0] } // Convert albums array to single object
      }
    }
  ])
}

const getArtistTopTracks = async (artistId, limit = 10) => {
  try {
    const tracks = await Song.aggregate([
      { $match: { artists: new mongoose.Types.ObjectId(artistId) } },
      { $sort: { popularity: -1, views: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'artists',
          foreignField: '_id',
          as: 'artists',
          pipeline: [{ $project: { _id: 1, name: 1 } }]
        }
      },
      // Lookup to populate album details
      {
        $lookup: {
          from: 'albums',
          localField: 'albums',
          foreignField: '_id',
          as: 'album',
          pipeline: [{ $project: { _id: 1, title: 1 } }]
        }
      },
      // Convert arrays to single objects where needed
      {
        $addFields: {
          albums: { $arrayElemAt: ['$album', 0] }
        }
      },
      // Project final format
      {
        $project: {
          _id: 1,
          title: 1,
          image_url: 1,
          audio_url: 1,
          duration: 1,
          popularity: 1,
          views: 1,
          artists: 1,
          albums: 1,
          isExplicit: 1
        }
      }
    ])
    return tracks
  } catch (error) {
    throw new Error(error)
  }
}

const getAlbumGenresBySongId = async (songId) => {
  try {
    const song = await Song.findById(songId)
      .populate({
        path: 'albums',
        select: 'genres',
        populate: {
          path: 'genres',
          select: '_id'
        }
      })
      .lean()

    if (!song || !song.albums) {
      return []
    }

    return song.albums.genres
  } catch (error) {
    throw new Error(error)
  }
}

const getRecommendedSongsByIds = async (songId, limit = 5) => {
  try {
    // First get the genres from the song's album
    const genres = await getAlbumGenresBySongId(songId)

    if (!genres || genres.length === 0) {
      // Fallback: return popular songs if no genres found
      return []
    }

    // Get songs from albums that share at least one genre
    const recommendedSongs = await Song.aggregate([
      // Exclude the original song first
      { $match: { _id: { $ne: new mongoose.Types.ObjectId(songId) } } },
      // Lookup to get album details including genres
      {
        $lookup: {
          from: 'albums',
          localField: 'albums',
          foreignField: '_id',
          as: 'albumData',
          pipeline: [
            {
              $lookup: {
                from: 'genres',
                localField: 'genres',
                foreignField: '_id',
                as: 'albumGenres'
              }
            },
            { $project: { albumGenres: 1 } }
          ]
        }
      },
      // Unwind the albumData array
      { $unwind: '$albumData' },
      // Match songs where the album has at least one genre in common
      {
        $match: {
          'albumData.albumGenres._id': {
            $in: genres.map((g) => g._id)
          }
        }
      },
      // Group by song _id to prevent duplicates
      {
        $group: {
          _id: '$_id',
          doc: { $first: '$$ROOT' }
        }
      },
      // Replace root with the original document
      { $replaceRoot: { newRoot: '$doc' } },
      // Sort by popularity and views
      { $sort: { popularity: -1, views: -1 } },
      // Limit results
      { $limit: limit },
      // Lookup to populate artists
      {
        $lookup: {
          from: 'users',
          localField: 'artists',
          foreignField: '_id',
          as: 'artists',
          pipeline: [{ $project: { _id: 1, name: 1 } }]
        }
      },
      // Lookup to populate album (full details)
      {
        $lookup: {
          from: 'albums',
          localField: 'albums',
          foreignField: '_id',
          as: 'album',
          pipeline: [{ $project: { _id: 1, title: 1 } }]
        }
      },
      // Convert album array to single object
      {
        $addFields: {
          albums: { $arrayElemAt: ['$album', 0] }
        }
      },
      // Remove temporary fields
      { $project: { albumData: 0, album: 0 } }
    ])

    return recommendedSongs
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
      data,
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
  findSongById,
  getRandomSongs,
  checkSongsExist,
  searchSongs,
  getArtistTopTracks,
  getRecommendedSongsByIds
}
