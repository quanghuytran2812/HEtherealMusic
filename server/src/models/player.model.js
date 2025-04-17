const { enumData } = require('@/utils/constants.utils')
const { messagePlayer } = require('@/validations/custom.validation')
const Joi = require('joi')
const mongoose = require('mongoose')

const playerSchema = mongoose.Schema(
  {
    cursors: {
      shuffle: { type: Boolean, default: false },
      repeat: { type: Boolean, default: false }
    },
    items: [
      {
        type: { type: String, enum: ['Album', 'Playlist'] },
        track: { type: mongoose.Schema.Types.ObjectId, refPath: 'items.type' },
        playedAt: { type: Date, default: Date.now }
      }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true, versionKey: false } // createdAt, updatedAt
)

const schema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        track: Joi.string()
          .pattern(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': messagePlayer.track.required,
            'string.pattern.base': messagePlayer.track.pattern
          }),
        type: Joi.string()
          .valid(...Object.values(enumData.playerType))
          .required()
          .messages({
            'string.empty': messagePlayer.type.required,
            'any.only': messagePlayer.type.invalid
          })
      })
    )
    .required()
    .messages({
      'array.base': messagePlayer.items.base,
      'any.required': messagePlayer.items.required
    }),
  user: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'any.required': messagePlayer.user.required,
      'string.pattern.base': messagePlayer.user.pattern
    })
})
// Indicates which Fields we do not allow to be updated in the Player()
const INVALID_UPDATE_FIELD = ['_id', 'createdAt']

const Player = mongoose.model('Player', playerSchema)

const validateBeforeSave = async (data) => {
  return await schema.validateAsync(data, { abortEarly: false })
}

const createNewPlayer = async (data) => {
  try {
    const validData = await validateBeforeSave(data)
    const createdPlayer = await Player.create(validData)
    return createdPlayer
  } catch (error) {
    throw new Error(error)
  }
}

const findPlayerByUserId = async (userId) => {
  try {
    const player = await Player.findOne({ user: userId })
      .populate({
        path: 'items.track',
        select: 'songs',
        populate: {
          path: 'songs',
          select:
            '-albums -updatedAt -createdAt -popularity -views -isExplicit -type',
          populate: {
            path: 'artists',
            select: '_id name'
          }
        }
      })
      .select('cursors items')

    // Sort items by playedAt in descending order
    if (player && player.items) {
      player.items.sort((a, b) => new Date(b.playedAt) - new Date(a.playedAt))
    }

    return player
  } catch (error) {
    throw new Error(error)
  }
}

const trackExistInPlayer = async (userId, trackId, typeItem) => {
  try {
    const player = await Player.findOne({
      user: userId,
      'items.track': trackId,
      'items.type': typeItem
    }).exec()
    return player
  } catch (error) {
    throw new Error(error)
  }
}

const getTopArtists = async (userId, limit, offset) => {
  try {
    // First get the total count without pagination
    const totalCount = await mongoose.model('Player').aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'albums',
          localField: 'items.track',
          foreignField: '_id',
          as: 'album'
        }
      },
      { $unwind: '$album' },
      { $unwind: '$album.artists' },
      { $group: { _id: '$album.artists' } },
      { $count: 'total' }
    ])

    const total = totalCount[0]?.total || 0

    // Then get the paginated results
    const playerItems = await mongoose.model('Player').aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'albums',
          localField: 'items.track',
          foreignField: '_id',
          as: 'album'
        }
      },
      { $unwind: '$album' },
      { $unwind: '$album.artists' },
      {
        $group: {
          _id: '$album.artists',
          lastPlayed: { $max: '$items.playedAt' }
        }
      },
      { $sort: { lastPlayed: -1 } },
      { $skip: offset },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'artist'
        }
      },
      { $unwind: '$artist' },
      {
        $project: {
          _id: '$artist._id',
          name: '$artist.name',
          image_url: { $arrayElemAt: ['$artist.imageUrl', 0] },
          type: '$artist.type'
        }
      }
    ])

    // Calculate if there are more items
    const hasMore = offset + playerItems.length < total

    return {
      items: playerItems,
      pagination: {
        limit,
        offset,
        total,
        next: hasMore
      }
    }
  } catch (error) {
    throw new Error(error)
  }
}

const getTopTracks = async (userId, limit, offset) => {
  try {
    // First get the total count of unique tracks
    const totalCount = await mongoose.model('Player').aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'albums',
          localField: 'items.track',
          foreignField: '_id',
          as: 'album'
        }
      },
      { $unwind: '$album' },
      { $unwind: '$album.songs' },
      { $group: { _id: '$album.songs' } }, // Group by song ID to count unique tracks
      { $count: 'total' }
    ])

    const total = totalCount[0]?.total || 0

    // Then get the paginated results
    const tracks = await mongoose.model('Player').aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'albums',
          localField: 'items.track',
          foreignField: '_id',
          as: 'album'
        }
      },
      { $unwind: '$album' },
      { $unwind: '$album.songs' },
      {
        $lookup: {
          from: 'songs',
          localField: 'album.songs',
          foreignField: '_id',
          as: 'song'
        }
      },
      { $unwind: '$song' },
      {
        $lookup: {
          from: 'users',
          localField: 'song.artists',
          foreignField: '_id',
          as: 'artists'
        }
      },
      {
        $group: {
          _id: '$song._id',
          lastPlayed: { $max: '$items.playedAt' },
          song: { $first: '$song' },
          album: { $first: '$album' },
          artists: { $first: '$artists' }
        }
      },
      { $sort: { lastPlayed: -1 } }, // Sort by most recent play
      { $skip: offset },
      { $limit: limit },
      {
        $project: {
          _id: '$song._id',
          title: '$song.title',
          duration: '$song.duration',
          image_url: '$song.image_url',
          audio_url: '$song.audio_url',
          albums: {
            _id: '$album._id',
            title: '$album.title'
          },
          artists: {
            $map: {
              input: '$artists',
              as: 'artist',
              in: {
                _id: '$$artist._id',
                name: '$$artist.name'
              }
            }
          }
        }
      }
    ])

    // Calculate if there are more items
    const hasMore = offset + tracks.length < total

    return {
      items: tracks,
      pagination: {
        limit,
        offset,
        total,
        next: hasMore
      }
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

const updatePlayer = async (id, data) => {
  try {
    // Remove fields that are not permitted to be modified.
    Object.keys(data).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELD.includes(fieldName)) {
        delete data[fieldName]
      }
    })

    const result = await Player.findByIdAndUpdate(
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
  createNewPlayer,
  updatePlayer,
  trackExistInPlayer,
  findPlayerByUserId,
  getTopArtists,
  getTopTracks
}
