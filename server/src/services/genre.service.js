const { Genre } = require('@/models')
const { ApiError } = require('@/utils/apiError.utils')
const { StatusCodes } = require('http-status-codes')

const createNewGenre = async (data) => {
  const { genre_name } = data
  const existingGenre = await Genre.findGenreByGenreName(genre_name)

  if (existingGenre.length > 0) {
    throw new ApiError(StatusCodes.CONFLICT, 'Genre name already exists!')
  }

  const createdGenre = await Genre.createNewGenre(data)
  return createdGenre
}

const getAllGenres = async () => {
  const genres = await Genre.getAllGenres()
  return genres
}

const getGenreById = async (id) => {
  const genre = await Genre.findGenreById(id)
  return genre
}

const getGenreByName = async (name) => {
  const genre = await Genre.findGenreByGenreName(name)
  return genre
}

module.exports = {
  createNewGenre,
  getAllGenres,
  getGenreById,
  getGenreByName
}