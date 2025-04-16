const { playerService } = require('@/services')
const catchAsync = require('@/utils/catchAsync.utils')
const { StatusCodes } = require('http-status-codes')

const createNewPlayer = catchAsync(async (req, res) => {
  const { uid } = req.user
  const player = await playerService.createNewPlayer(uid, req.body)
  res.status(StatusCodes.CREATED).send(player)
})

const getRecentlyPlayed = catchAsync(async (req, res) => {
  const { uid } = req.user
  const player = await playerService.getRecentlyPlayed(uid)
  res.status(StatusCodes.OK).send(player)
})

module.exports = {
  createNewPlayer,
  getRecentlyPlayed
}