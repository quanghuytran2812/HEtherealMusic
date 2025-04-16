const { PlayList, Genre, User, Song } = require('@/models')
const { ApiError } = require('@/utils/apiError.utils')
const { StatusCodes } = require('http-status-codes')

const createNewPlaylist = async (userId, data) => {
  try {
    // Check if playlist name is unique
    const playlistName = data.title
    const existingPlaylist = await PlayList.findPlaylistByName(playlistName)
    if (existingPlaylist) {
      throw new ApiError(StatusCodes.CONFLICT, 'You already have a playlist with this name!')
    }

    // Check if genres exist
    if (data.genres && data.genres.length > 0) {
      const genreIds = data.genres
      const genres = await Genre.checkGenresExist(genreIds)
      if (genres.length !== genreIds.length) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          'One or more genre IDs are invalid'
        )
      }
    }

    // Check if songs exist
    if (data.songs && data.songs.length > 0) {
      const songIds = data.songs
      const songs = await Song.checkSongsExist(songIds)
      if (songs.length !== songIds.length) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          'One or more song IDs are invalid'
        )
      }
    }

    // Check if user exists
    const user = await User.findUserById(userId)
    if (!user) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'User does not exist')
    }

    const playlistData = {
      ...data,
      users: userId
    }
    const createdPlaylist = await PlayList.createNewPlaylist(playlistData)
    return createdPlaylist
  } catch (error) {
    throw error instanceof ApiError ? error : new Error(error.message)
  }
}

const getPopularPlaylists = async () => {
  try {
    const popularPlaylists = await PlayList.findPopularPlaylists()
    return popularPlaylists
  } catch (error) {
    throw error instanceof ApiError ? error : new Error(error.message)
  }
}

const getTopPlaylists = async () => {
  try {
    const topPlaylists = await PlayList.findTopPlaylists()
    return topPlaylists
  } catch (error) {
    throw error instanceof ApiError ? error : new Error(error.message)
  }
}

const getPlaylistById = async (playlistId) => {
  try {
    const playlist = await PlayList.findPlaylistById(playlistId)
    return playlist
  } catch (error) {
    throw error instanceof ApiError ? error : new Error(error.message)
  }
}

module.exports = {
  createNewPlaylist,
  getPopularPlaylists,
  getTopPlaylists,
  getPlaylistById
}