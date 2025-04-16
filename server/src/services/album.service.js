const { Album, Genre, User, Song, Player } = require('@/models')
const { ApiError } = require('@/utils/apiError.utils')
const { StatusCodes } = require('http-status-codes')

const createNewAlbum = async (data) => {
  try {
    // Check if genres exist
    const genreIds = data.genres
    const genres = await Genre.checkGenresExist(genreIds)
    if (genres.length !== genreIds.length) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'One or more genre IDs are invalid'
      )
    }

    // Check if artists exist
    const artistIds = data.artists
    const artists = await User.checkUsersExist(artistIds)
    if (artists.length !== artistIds.length) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'One or more artist IDs are invalid'
      )
    }
    const createdAlbum = await Album.createNewAlbum(data)
    return createdAlbum
  } catch (error) {
    throw new Error(error)
  }
}

const getNewReleaseAlbums = async () => {
  try {
    const albums = await Album.findNewReleaseAlbums()
    return albums
  } catch (error) {
    throw new Error(error)
  }
}

const getAlbumById = async (albumId) => {
  try {
    const album = await Album.findAlbumById(albumId)
    return album
  } catch (error) {
    throw new Error(error)
  }
}

const getAllAlbumsByArtist = async (artistId) => {
  try {
    const albums = await Album.findAllAlbumsByArtist(artistId)
    return albums
  } catch (error) {
    throw new Error(error)
  }
}

const getRecommendAlbums = async (userId) => {
  try {
    const genres = new Set()
    const artistIds = new Set()
    const trackIds = new Set()

    const extractDetails = (item) => {
      const { track } = item
      if (track.genres) track.genres.forEach(genre => genres.add(genre))
      if (track.artists) track.artists.forEach(artist => artistIds.add(artist))
      if (track.songs) track.songs.forEach(song => trackIds.add(song))
    }

    const player = await Player.findPlayerByUserId(userId)
    if (player) {
      player.items.forEach(extractDetails)
    }

    const fetchDefaults = async () => {
      const [firstArtist, firstGenres, firstTrack] = await Promise.all([
        artistIds.size ? [] : User.getRandomArtist(),
        genres.size ? [] : Genre.getRandomGenres(),
        trackIds.size ? [] : Song.getRandomSongs()
      ])

      firstArtist.forEach(artist => artistIds.add(artist))
      firstGenres.forEach(genre => genres.add(genre))
      firstTrack.forEach(track => trackIds.add(track))
    }

    await fetchDefaults()

    const albums = await Album.findRecommendAlbums(
      Array.from(artistIds),
      Array.from(genres),
      Array.from(trackIds)
    )
    return albums
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createNewAlbum,
  getNewReleaseAlbums,
  getAlbumById,
  getAllAlbumsByArtist,
  getRecommendAlbums
}
