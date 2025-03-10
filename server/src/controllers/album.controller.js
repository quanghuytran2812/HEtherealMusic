const { albumService } = require('@/services')
const catchAsync = require('@/utils/catchAsync.utils')
const { StatusCodes } = require('http-status-codes')

const createNewAlbum = catchAsync(async (req, res) => {
  const album = await albumService.createNewAlbum(req.body)
  res.status(StatusCodes.CREATED).send(album)
})

const getNewReleaseAlbums = catchAsync(async (req, res) => {
  const albums = await albumService.getNewReleaseAlbums()
  res.status(StatusCodes.OK).send(albums)
})

const getAlbumById = catchAsync(async (req, res) => {
  const album = await albumService.getAlbumById(req.params.albumId)
  res.status(StatusCodes.OK).send(album)
})

const getAllAlbumsByArtist = catchAsync(async (req, res) => {
  const albums = await albumService.getAllAlbumsByArtist(req.params.artistId)
  res.status(StatusCodes.OK).send(albums)
})

module.exports = {
  createNewAlbum,
  getNewReleaseAlbums,
  getAlbumById,
  getAllAlbumsByArtist
}