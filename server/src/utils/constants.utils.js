const { env } = require('@/config/environment.config')

const WHITELIST_DOMAINS = [
  env.CLIENT_URL
]

const enumData = {
  loginType: ['password', 'google'],
  userType: ['user', 'admin', 'artist'],
  gender: ['male', 'female', 'other'],
  songType: ['song', 'podcast'],
  albumType: ['single', 'album'],
  libraryType: ['User', 'Album', 'Playlist'],
  playerType: ['Album', 'Playlist'],
  playlistType: ['individual', 'topLists', 'popularPlaylists', 'likedSongs']
}

module.exports = { WHITELIST_DOMAINS, enumData }