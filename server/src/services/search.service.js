const { Song, User, Album, PlayList, Genre } = require('@/models')
const { ApiError } = require('@/utils/apiError.utils')
const { StatusCodes } = require('http-status-codes')

const searchAll = async (query) => {
  try {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Search query is required')
    }
    const [songs, artists, albums, playlists, users, genres] =
      await Promise.all([
        Song.searchSongs(query),
        User.searchArtists(query),
        Album.searchAlbums(query),
        PlayList.searchPlaylists(query),
        User.searchUsers(query),
        Genre.searchGenres(query)
      ])
    return {
      songs,
      artists,
      albums,
      playlists,
      users,
      genres
    }
  } catch (error) {
    throw new Error(error)
  }
}

const searchByType = async (query, type, limit) => {
  try {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Search query is required')
    }
    switch (type) {
    case 'songs':
      return {
        songs: await Song.searchSongs(query, limit)
      }
    case 'artists':
      return {
        artists: await User.searchArtists(query, limit)
      }
    case 'albums':
      return {
        albums: await Album.searchAlbums(query, limit)
      }
    case 'playlists':
      return {
        playlists: await PlayList.searchPlaylists(query, limit)
      }
    case 'users':
      return {
        users: await User.searchUsers(query, limit)
      }
    case 'genres':
      return {
        genres: await Genre.searchGenres(query, limit)
      }
    default:
      throw new Error('Invalid search type')
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  searchByType,
  searchAll
}
