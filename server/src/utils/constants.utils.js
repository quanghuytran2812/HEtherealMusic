const { env } = require('@/config/environment.config')

const WHITELIST_DOMAINS = [
  'https://h-ethereal-music-web.vercel.app/'
]

const enumData = {
  loginType: ['password', 'google'],
  userType: ['user', 'admin', 'artist'],
  gender: ['male', 'female', 'other'],
  songType: ['song', 'podcast'],
  albumType: ['single', 'album'],
  libraryType: ['User', 'Album', 'Playlist'],
  playerType: ['Album', 'Playlist'],
  playlistType: ['all', 'topLists', 'popularPlaylists', 'likedSongs']
}

module.exports = { WHITELIST_DOMAINS, enumData }