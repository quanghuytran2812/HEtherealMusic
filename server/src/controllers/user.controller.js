const { userService } = require('@/services')
const catchAsync = require('@/utils/catchAsync')
const { StatusCodes } = require('http-status-codes')

const createUser = catchAsync (async(req, res) => {
  const user = await userService.createUser(req.body)
  res.status(StatusCodes.CREATED).send(user)
})

const getMe = catchAsync (async(req, res) => {
  const user = await userService.getMe(req.user)
  res.status(StatusCodes.OK).send(user)
})

const updateUser = catchAsync (async(req, res) => {
  const userId = req.user.uid
  const userAvatarFile = req.file
  const user = await userService.updateUser(userId, req.body, userAvatarFile)
  res.status(StatusCodes.OK).send(user)
})

module.exports = {
  createUser,
  getMe,
  updateUser
}