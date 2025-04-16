const { playlistService } = require('@/services')
const catchAsync = require('@/utils/catchAsync.utils')
const { StatusCodes } = require('http-status-codes')

const createNewPlaylist = catchAsync(async (req, res) => {
  const { uid } = req.user
  const playlist = await playlistService.createNewPlaylist(uid, req.body)
  res.status(StatusCodes.CREATED).send(playlist)
})

const getPopularPlaylists = catchAsync(async (req, res) => {
  const popularPlaylists = await playlistService.getPopularPlaylists()
  res.status(StatusCodes.OK).send(popularPlaylists)
})

const getTopPlaylists = catchAsync(async (req, res) => {
  const topPlaylists = await playlistService.getTopPlaylists()
  res.status(StatusCodes.OK).send(topPlaylists)
})

const getPlaylistById = catchAsync(async (req, res) => {
  const playlist = await playlistService.getPlaylistById(req.params.playlistId)
  res.status(StatusCodes.OK).send(playlist)
})

module.exports = {
  createNewPlaylist,
  getPopularPlaylists,
  getTopPlaylists,
  getPlaylistById
}