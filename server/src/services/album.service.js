const { Album, Genre, User } = require('@/models')
const { ApiError } = require('@/utils/apiError.utils')
const { StatusCodes } = require('http-status-codes')

const createNewAlbum = async (data) => {
// Check if genres exist
  const genreIds = data.genres
  const genres = await Genre.checkGenresExist(genreIds)
  if (genres.length !== genreIds.length) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'One or more genre IDs are invalid')
  }

  // Check if artists exist
  const artistIds = data.artists
  const artists = await User.checkUsersExist(artistIds)
  if (artists.length !== artistIds.length) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'One or more artist IDs are invalid')
  }
  const createdAlbum = await Album.createNewAlbum(data)
  return createdAlbum
}

const getNewReleaseAlbums = async () => {
  const albums = await Album.findNewReleaseAlbums()
  return albums
}

const getAlbumById = async (albumId) => {
  const album = await Album.findAlbumById(albumId)
  return album
}

const getAllAlbumsByArtist = async (artistId) => {
  const albums = await Album.findAllAlbumsByArtist(artistId)
  return albums
}

module.exports = {
  createNewAlbum,
  getNewReleaseAlbums,
  getAlbumById,
  getAllAlbumsByArtist
}