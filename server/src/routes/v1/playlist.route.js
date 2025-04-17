const { playlistController } = require('@/controllers')
const { authMiddleware } = require('@/middlewares/auth.middleware')
const { playlistValidation } = require('@/validations')


const router = require('express').Router()

router.post('/create-new-playlist', authMiddleware.isAuthorized, playlistValidation.createNewPlaylist, playlistController.createNewPlaylist)
router.get('/get-popular-playlists', playlistController.getPopularPlaylists)
router.get('/get-top-playlists', playlistController.getTopPlaylists)
router.get('/get-playlist-by-id/:playlistId', playlistController.getPlaylistById)
router.get('/get-playlists-by-genre/:genreId', playlistController.getPlaylistsByGenre)

module.exports = router