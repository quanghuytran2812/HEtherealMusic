const { Player, Album, PlayList } = require('@/models')
const { ApiError } = require('@/utils/apiError.utils')
const { StatusCodes } = require('http-status-codes')
const { default: mongoose } = require('mongoose')

const fetchContainer = async (track) => {
  const [album, playlist] = await Promise.all([
    Album.findAlbumById(track),
    PlayList.findPlaylistById(track)
  ])

  if (album) return 'Album'
  if (playlist) return 'Playlist'

  return null // If neither is found
}
const createNewPlayer = async (userId, data) => {
  const { track } = data

  try {
    // Check if the track belongs to an album or playlist
    const type = await fetchContainer(track)

    // If neither album nor playlist is found, throw an error
    if (!type) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Track does not belong to an album or playlist')
    }
    // Fetch existing player and check for the track
    const player = await Player.findPlayerByUserId(userId)
    const existingPlayer = player ? await Player.trackExistInPlayer(userId, track, type) : null
    if (existingPlayer) {
      // Update playedAt for existing items
      const trackObjectId = new mongoose.Types.ObjectId(track)
      const itemIndex = existingPlayer.items.findIndex(item => item.track.equals(trackObjectId))

      if (itemIndex > -1) {
        existingPlayer.items[itemIndex].playedAt = new Date()
      }
      return await Player.updatePlayer(existingPlayer._id, existingPlayer)
    }

    // Create or update player
    if (!player) {
      return await Player.createNewPlayer({
        items: [{ type, track }],
        user: userId
      })
    }

    // Manage items in the player
    if (player.items.length >= 10) {
      player.items.pop() // Remove the oldest item
    }

    player.items.push({ type, track })
    return await player.save()
  } catch (error) {
    throw new Error(error)
  }
}

const getRecentlyPlayed = async(userId) => {
  try {
    const player = await Player.findPlayerByUserId(userId)
    return player
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createNewPlayer,
  getRecentlyPlayed
}