const { Song, User, Album, PlayList } = require('@/models')
const { ApiError } = require('@/utils/apiError.utils')
const { StatusCodes } = require('http-status-codes')
import { CloudinaryProvider } from '@/utils/cloudinary.utils'
import { createNewPlaylist } from '@/services/playlist.service'
import { createNewLibrary, removeItemFromLibrary } from '@/services/library.service'

const createNewSong = async (data, files) => {
  try {
    // check if image and audio files are provided
    if (!files.imageUrl || !files.audioUrl) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Image and audio files are required'
      )
    }

    // check array artists
    const artistIds = data.artists
    const artists = await User.checkUsersExist(artistIds)
    if (artists.length !== artistIds.length) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'One or more artist IDs are invalid'
      )
    }

    // check album exists
    const album = await Album.findAlbumById(data.albums)
    if (!album) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Album does not exist')
    }

    // Upload image and audio to Cloudinary
    const uploadedFileImage = await CloudinaryProvider.streamUpload(files.imageUrl[0].buffer, 'users', 'image')
    const uploadedFileAudio = await CloudinaryProvider.streamUpload(files.audioUrl[0].buffer, 'users', 'video') // Use 'video' for audio files

    const createdSong = await Song.createNewSong({
      ...data,
      image_url: uploadedFileImage.secure_url,
      audio_url: uploadedFileAudio.secure_url
    })

    // If the song belongs to an album, update the album's songs array
    if (createdSong.albums) {
      await Album.findAlbumByIdAndUpdate(createdSong.albums, createdSong)
    }
    return createdSong
  } catch (error) {
    throw error instanceof ApiError ? error : new Error(error.message)
  }
}

const likeSong = async (userId, songId) => {
  try {
    // Check if song exists
    const song = await Song.findSongById(songId)
    if (!song) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Song not found')
    }

    // Check if user exists
    const user = await User.findUserById(userId)
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    }

    // Find or create liked songs playlist
    let likedSongsPlaylist = await PlayList.findPlaylistsExist({
      users: userId,
      type: 'likedSongs'
    })

    if (!likedSongsPlaylist) {
      // Create new liked songs playlist if it doesn't exist
      likedSongsPlaylist = await createNewPlaylist(userId, {
        title: 'Liked Songs',
        image_url: 'https://c4.wallpaperflare.com/wallpaper/348/1019/586/heart-red-headphones-drawing-wallpaper-preview.jpg',
        songs: [songId],
        type: 'likedSongs',
        isPublic: false // Liked songs playlist should be private by default
      })
      await createNewLibrary(likedSongsPlaylist._id, userId)
    } else {
      // Check if song is already in the playlist
      if (likedSongsPlaylist.songs.includes(songId)) {
        throw new ApiError(StatusCodes.CONFLICT, 'Song already liked')
      }

      // Add song to existing playlist
      await PlayList.updatePlaylist(likedSongsPlaylist._id, { $push: { songs: songId } })
    }

    // Increment song's popularity
    await Song.updateSong(songId, { $inc: { popularity: 1 } })

    return likedSongsPlaylist
  } catch (error) {
    throw error instanceof ApiError ? error : new Error(error.message)
  }
}

const unlikeSong = async (userId, songId) => {
  try {
    // Check if song exists
    const song = await Song.findSongById(songId)
    if (!song) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Song not found')
    }

    // Find liked songs playlist
    const likedSongsPlaylist = await PlayList.findPlaylistsExist({
      users: userId,
      type: 'likedSongs'
    })

    if (!likedSongsPlaylist) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'No liked songs playlist found')
    }

    // Check if song exists in playlist
    const songIndex = likedSongsPlaylist.songs.indexOf(songId)
    if (songIndex === -1) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Song not found in liked songs')
    }

    // Remove song from playlist
    likedSongsPlaylist.songs.splice(songIndex, 1)

    // Decrement song's popularity
    await Song.updateSong(songId, { $inc: { popularity: -1 } })

    // Delete playlist if it's empty
    if (likedSongsPlaylist.songs.length === 0) {
      await removeItemFromLibrary(likedSongsPlaylist._id, userId)
      await PlayList.removePlaylist(likedSongsPlaylist._id)
      return { message: 'Liked songs playlist removed as it became empty' }
    }

    // Save playlist if it still has songs
    await likedSongsPlaylist.save()
    return likedSongsPlaylist
  } catch (error) {
    throw error instanceof ApiError ? error : new Error(error.message)
  }
}

const getSongById = async (songId) => {
  try {
    const song = await Song.findSongById(songId)
    return song
  } catch (error) {
    throw error instanceof ApiError ? error : new Error(error.message)
  }
}

const getRecommendedSongsById = async (songId) => {
  try {
    const recommendedSongs = await Song.getRecommendedSongsByIds(songId)
    return recommendedSongs
  } catch (error) {
    throw error instanceof ApiError ? error : new Error(error.message)
  }
}

module.exports = {
  createNewSong,
  likeSong,
  unlikeSong,
  getSongById,
  getRecommendedSongsById
}
