const { followService } = require('@/services')
const catchAsync = require('@/utils/catchAsync.utils')
const { StatusCodes } = require('http-status-codes')

const followUser = catchAsync(async (req, res) => {
  const { uid } = req.user
  const { followerId } = req.body
  const followedUser = await followService.followUser(uid, followerId)
  res.status(StatusCodes.OK).send(followedUser)
})

const unfollowUser = catchAsync(async (req, res) => {
  const { uid } = req.user
  const { followerId } = req.params
  const followedUser = await followService.unfollowUser(uid, followerId)
  res.status(StatusCodes.OK).send(followedUser)
})

const getArtistsFollowedByUser = catchAsync(async (req, res) => {
  const { uid } = req.user
  let { limit = 10, offset = 0 } = req.query

  // Convert query params to numbers
  limit = parseInt(limit)
  offset = parseInt(offset)
  const artists = await followService.getArtistsFollowedByUser(uid, limit, offset)
  res.status(StatusCodes.OK).send(artists)
})

const getRelatedArtists = catchAsync(async (req, res) => {
  const { artistId } = req.params
  let { limit = 10, offset = 0 } = req.query

  // Convert query params to numbers
  limit = parseInt(limit)
  offset = parseInt(offset)
  const artists = await followService.getRelatedArtists(artistId, limit, offset)
  res.status(StatusCodes.OK).send(artists)
})

module.exports = {
  followUser,
  unfollowUser,
  getArtistsFollowedByUser,
  getRelatedArtists
}