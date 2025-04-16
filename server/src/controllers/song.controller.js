const { songService } = require('@/services')
const catchAsync = require('@/utils/catchAsync.utils')
const { StatusCodes } = require('http-status-codes')

const createNewSong = catchAsync(async (req, res) => {
  const song = await songService.createNewSong(req.body, req.files)
  res.status(StatusCodes.CREATED).send(song)
})

const likeSong = catchAsync(async (req, res) => {
  const { uid } = req.user
  const { songId } = req.body
  const song = await songService.likeSong(uid, songId)
  res.status(StatusCodes.OK).send(song)
})

const unlikeSong = catchAsync(async (req, res) => {
  const { uid } = req.user
  const { songId } = req.params
  const song = await songService.unlikeSong(uid, songId)
  res.status(StatusCodes.OK).send(song)
})

module.exports = {
  createNewSong,
  likeSong,
  unlikeSong
}