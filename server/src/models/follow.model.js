const { messageFollow } = require('@/validations/custom.validation')
const Joi = require('joi')
const mongoose = require('mongoose')

const followSchema = new mongoose.Schema(
  {
    following_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    followed_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true, versionKey: false } // createdAt, updatedAt
)

const schema = Joi.object({
  following_user_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'any.required': messageFollow.following_user_id.required,
      'string.pattern.base': messageFollow.following_user_id.pattern
    }),
  followed_user_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'any.required': messageFollow.followed_user_id.required,
      'string.pattern.base': messageFollow.followed_user_id.pattern
    })
})

// Indicates which Fields we do not allow to be updated in the updateUser()
const INVALID_UPDATE_FIELD = [
  'following_user_id',
  'followed_user_id',
  'createdAt'
]

const Follow = mongoose.model('Follow', followSchema)
const validateBeforeSave = async (data) => {
  return await schema.validateAsync(data, { abortEarly: false })
}

const createNewFollow = async (data) => {
  try {
    const validData = await validateBeforeSave(data)
    const createdFollow = await Follow.create(validData)
    return createdFollow
  } catch (error) {
    throw new Error(error)
  }
}

const checkFollowExist = async (followerId, followingId) => {
  try {
    const follow = await Follow.find({
      following_user_id: followingId,
      followed_user_id: followerId
    })
    return follow
  } catch (error) {
    throw new Error(error)
  }
}

const removeFollow = async (followerId, followingId) => {
  try {
    const result = await Follow.findOneAndDelete({
      following_user_id: followingId,
      followed_user_id: followerId
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const findArtistsFollowedByUser = async (userId, limit, offset, type) => {
  try {
    const result = await Follow.aggregate([
      // Match follows by this user
      {
        $match: {
          following_user_id: new mongoose.Types.ObjectId(userId)
        }
      },

      // Lookup the followed users (artists)
      {
        $lookup: {
          from: 'users', // Collection name
          localField: 'followed_user_id',
          foreignField: '_id',
          as: 'followedUser'
        }
      },
      { $unwind: '$followedUser' },

      // Filter only artists
      {
        $match: {
          'followedUser.type': type,
          'followedUser.isDeleted': { $ne: true }
        }
      },

      // Project only the required fields
      {
        $project: {
          _id: '$followedUser._id',
          name: '$followedUser.name',
          image_url: { $arrayElemAt: ['$followedUser.imageUrl', 0] },
          type: '$followedUser.type'
        }
      },

      // Pagination
      { $skip: offset },
      { $limit: limit }
    ])

    // Get total count for pagination
    const total = await Follow.countDocuments({
      following_user_id: userId
    }).populate({
      path: 'followed_user_id',
      match: { type: type, isDeleted: { $ne: true } }
    })

    // Calculate if there are more items
    const hasMore = offset + result.length < total

    return {
      items: result,
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

const getRelatedArtists = async (artistId, limit, offset) => {
  try {
    const result = await Follow.aggregate([
      {
        $match: {
          followed_user_id: new mongoose.Types.ObjectId(artistId)
        }
      },

      // Lookup the following users (artists)
      {
        $lookup: {
          from: 'users', // Collection name
          localField: 'following_user_id',
          foreignField: '_id',
          as: 'artist'
        }
      },
      { $unwind: '$artist' },

      // Filter only artists
      {
        $match: {
          'artist.type': 'artist',
          'artist.isDeleted': { $ne: true }
        }
      },

      // Project only the required fields
      {
        $project: {
          _id: '$artist._id',
          name: '$artist.name',
          image_url: { $arrayElemAt: ['$artist.imageUrl', 0] }, // Get first image
          type: '$artist.type'
        }
      },
      // Pagination
      { $skip: offset },
      { $limit: limit }
    ])
    // Get total count for pagination
    const total = await Follow.countDocuments({
      followed_user_id: artistId
    }).populate({
      path: 'following_user_id',
      match: { type: 'artist', isDeleted: { $ne: true } }
    })

    // Calculate if there are more items
    const hasMore = offset + result.length < total

    return {
      items: result,
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

const updateFollow = async (id, data) => {
  try {
    // Remove fields that are not permitted to be modified.
    Object.keys(data).forEach((fieldName) => {
      if (INVALID_UPDATE_FIELD.includes(fieldName)) {
        delete data[fieldName]
      }
    })

    const result = await Follow.findByIdAndUpdate(
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
  createNewFollow,
  updateFollow,
  checkFollowExist,
  removeFollow,
  findArtistsFollowedByUser,
  getRelatedArtists
}
