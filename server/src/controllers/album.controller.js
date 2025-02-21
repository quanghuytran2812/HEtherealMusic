const { albumService } = require('@/services')
const catchAsync = require('@/utils/catchAsync.utils')
const { StatusCodes } = require('http-status-codes')

const createNewAlbum = catchAsync(async (req, res) => {
  const album = await albumService.createNewAlbum(req.body)
  res.status(StatusCodes.CREATED).send(album)
})

module.exports = {
  createNewAlbum
}