const { libraryService } = require('@/services')
const catchAsync = require('@/utils/catchAsync.utils')
const { StatusCodes } = require('http-status-codes')

const createNewLibrary = catchAsync(async (req, res) => {
  const { uid } = req.user
  const { track } = req.body
  const library = await libraryService.createNewLibrary(track, uid)
  res.status(StatusCodes.CREATED).send(library)
})

const deleteItemFromLibrary = catchAsync(async (req, res) => {
  const { uid } = req.user
  const { track } = req.params
  const library = await libraryService.removeItemFromLibrary(track, uid)
  res.status(StatusCodes.OK).send(library)
})

const getLibraryByUserId = catchAsync(async (req, res) => {
  const { uid } = req.user
  const library = await libraryService.getLibraryByUserId(uid)
  res.status(StatusCodes.OK).send(library)
})

module.exports = {
  createNewLibrary,
  getLibraryByUserId,
  deleteItemFromLibrary
}