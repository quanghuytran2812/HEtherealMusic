const { Follow, User } = require('@/models')
const { ApiError } = require('@/utils/apiError.utils')
const { StatusCodes } = require('http-status-codes')
const { createNewLibrary, removeItemFromLibrary } = require('@/services/library.service')

const followUser = async (followingId, followerId) => {
  try {
    if (followingId === followerId) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'You cannot follow yourself')
    }
    // Check if users exist
    const [followerUserId, followingUserId] = await Promise.all([
      User.findUserById(followerId),
      User.findUserById(followingId)
    ])

    if (!followerUserId || !followingUserId) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    }
    // Check if already following
    const existingFollow = await Follow.checkFollowExist(followerId, followingId)
    if (existingFollow.length > 0) {
      throw new ApiError(StatusCodes.CONFLICT, 'You are already following this user')
    }

    // Create new follow relationship
    const newFollow = await Follow.createNewFollow({
      following_user_id: followingId,
      followed_user_id: followerId
    })
    if (followerUserId.type === 'artist') {
      await createNewLibrary(followerId, followingId)
    }
    await User.updateUser(followerId, { popularity: 1 })

    return newFollow
  } catch (error) {
    throw new Error(error)
  }
}

const unfollowUser = async (followingId, followerId) => {
  try {
    const result = await Follow.removeFollow(followerId, followingId)
    const user = await User.findUserById(followerId)

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    }
    if (result) {
      // Update popularity count and remove library (optional)
      if (user.type === 'artist') {
        await removeItemFromLibrary(followerId, followingId)
      }
      await User.updateUser(followerId, { popularity: user.popularity - 1 })
    }

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getArtistsFollowedByUser = async (userId, limit, offset) => {
  try {
    const artists = await Follow.findArtistsFollowedByUser(userId, limit, offset)
    return artists
  } catch (error) {
    throw new Error(error)
  }
}

const getRelatedArtists = async (artistId, limit, offset) => {
  try {
    const artists = await Follow.getRelatedArtists(artistId, limit, offset)
    return artists
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  followUser,
  unfollowUser,
  getArtistsFollowedByUser,
  getRelatedArtists
}