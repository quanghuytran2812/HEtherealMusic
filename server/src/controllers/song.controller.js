const { songService } = require('@/services')
const catchAsync = require('@/utils/catchAsync.utils')
const { StatusCodes } = require('http-status-codes')

const createNewSong = catchAsync(async (req, res) => {
  const song = await songService.createNewSong(req.body, req.files)
  res.status(StatusCodes.CREATED).send(song)
})

module.exports = {
  createNewSong
}