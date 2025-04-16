const { Library, Album, PlayList, User } = require('@/models')
const { ApiError } = require('@/utils/apiError.utils')
const { StatusCodes } = require('http-status-codes')

const fetchContainer = async (track) => {
  const [album, playlist, user] = await Promise.all([
    Album.findAlbumById(track),
    PlayList.findPlaylistById(track),
    User.findArtistById(track)
  ])

  if (album) return 'Album'
  if (playlist) return 'Playlist'
  if (user) return 'User'

  return null // If neither is found
}

const updatePlaylistSaves = async (trackId, increment) => {
  if (increment !== 1 && increment !== -1) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid increment value for playlist saves')
  }
  await PlayList.updatePlaylist(trackId, { $inc: { saves: increment } })
}

const getUserLibrary = async (userId) => {
  const library = await Library.findLibraryByUserId(userId)
  if (!library) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Library not found')
  }
  return library
}
const createNewLibrary = async (trackId, userId) => {
  try {
    // Check if the library belongs to an album or playlist or user
    const type = await fetchContainer(trackId)
    // If neither album nor playlist is found, throw an error
    if (!type) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Track does not belong to an album or playlist or user')
    }

    const library = await Library.findLibraryByUserId(userId)
    const trackExists = library ? await Library.trackExistInLibrary(userId, trackId, type) : false
    if (trackExists) {
      throw new ApiError(StatusCodes.CONFLICT, 'Track already exists in the library')
    }

    // Update playlist saves if applicable
    if (type === 'Playlist') {
      await updatePlaylistSaves(trackId, 1)
    }
    // Create or update library
    const libraryUpdate = {
      $push: { items: { type, track: trackId } },
      user: userId
    }

    return library
      ? await Library.updateLibrary(library._id, libraryUpdate)
      : await Library.createNewLibrary({ items: [{ type, track: trackId }], user: userId })
  } catch (error) {
    throw error instanceof ApiError ? error : new Error(error.message)
  }
}

const getLibraryByUserId = async (userId) => {
  try {
    const library = await getUserLibrary(userId)
    return library
  } catch (error) {
    throw error instanceof ApiError ? error : new Error(error.message)
  }
}

const removeItemFromLibrary = async (trackId, userId) => {
  try {
    const library = await getUserLibrary(userId)
    // Find the item to remove
    const itemToRemove = library.items.find(item =>
      item.track &&
      item.track._id.toString() === trackId.toString()
    )

    // Update playlist saves if removing a playlist
    if (itemToRemove?.type === 'Playlist') {
      await updatePlaylistSaves(trackId, -1)
    }
    const updatedLibrary = await Library.updateLibrary(library._id, { $pull: { items: { track: trackId } } } )
    return updatedLibrary
  } catch (error) {
    throw error instanceof ApiError ? error : new Error(error.message)
  }
}

module.exports = {
  createNewLibrary,
  getLibraryByUserId,
  removeItemFromLibrary
}