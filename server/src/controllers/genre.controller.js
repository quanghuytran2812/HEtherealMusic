const { genreService } = require('@/services')
const catchAsync = require('@/utils/catchAsync.utils')
const { StatusCodes } = require('http-status-codes')

const createNewGenre = catchAsync(async (req, res) => {
  const genre = await genreService.createNewGenre(req.body)
  res.status(StatusCodes.CREATED).send(genre)
})

const getAllGenres = catchAsync(async (req, res) => {
  const genres = await genreService.getAllGenres()
  res.status(StatusCodes.OK).send(genres)
})

const getGenreById = catchAsync(async (req, res) => {
  const genre = await genreService.getGenreById(req.params.genreId)
  res.status(StatusCodes.OK).send(genre)
})

const getGenreByName = catchAsync(async (req, res) => {
  const genre = await genreService.getGenreByName(req.params.genreName)
  res.status(StatusCodes.OK).send(genre)
})

module.exports = {
  createNewGenre,
  getAllGenres,
  getGenreById,
  getGenreByName
}