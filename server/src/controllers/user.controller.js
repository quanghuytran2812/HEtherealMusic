const { userService } = require('@/services')
const catchAsync = require('@/utils/catchAsync.utils')
const { StatusCodes } = require('http-status-codes')

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body)
  res.status(StatusCodes.CREATED).send(user)
})

const getMe = catchAsync(async (req, res) => {
  const user = await userService.getMe(req.user)
  res.status(StatusCodes.OK).send(user)
})

const updateUser = catchAsync(async (req, res) => {
  const userId = req.user.uid
  const userAvatarFile = req.file
  const user = await userService.updateUser(userId, req.body, userAvatarFile)
  res.status(StatusCodes.OK).send(user)
})

const getRecommendArtists = catchAsync(async (req, res) => {
  const { artistIds } = req.query
  const artists = await userService.getRecommendArtists(artistIds)
  res.status(StatusCodes.OK).send(artists)
})

const getTop = catchAsync(async (req, res) => {
  const { uid } = req.user
  const { type } = req.params
  let { limit = 10, offset = 0 } = req.query

  // Convert query params to numbers
  limit = parseInt(limit)
  offset = parseInt(offset)
  const top = await userService.getTop(uid, type, limit, offset)
  res.status(StatusCodes.OK).send(top)
})

const getUserById = catchAsync(async (req, res) => {
  const { userId } = req.params
  const user = await userService.getUserById(userId)
  res.status(StatusCodes.OK).send(user)
})

const getArtistTopTracks = catchAsync(async (req, res) => {
  const { artistId } = req.params
  const tracks = await userService.getArtistTopTracks(artistId)
  res.status(StatusCodes.OK).send(tracks)
})

module.exports = {
  createUser,
  getMe,
  updateUser,
  getRecommendArtists,
  getTop,
  getUserById,
  getArtistTopTracks
}
