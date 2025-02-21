const { Song, User, Album } = require('@/models')
const { ApiError } = require('@/utils/apiError.utils')
const { StatusCodes } = require('http-status-codes')
import { CloudinaryProvider } from '@/utils/cloudinary.utils'

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
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
  }
}

module.exports = {
  createNewSong
}
