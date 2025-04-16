const router = require('express').Router()
const userRoutes = require('@/routes/v1/user.route')
const authRoutes = require('@/routes/v1/auth.route')
const songRoutes = require('@/routes/v1/song.route')
const albumRoutes = require('@/routes/v1/album.route')
const genreRoutes = require('@/routes/v1/genre.route')
const playerRoutes = require('@/routes/v1/player.route')
const playlistRoutes = require('@/routes/v1/playlist.route')
const libraryRoutes = require('@/routes/v1/library.route')
const followRoutes = require('@/routes/v1/follow.route')
const searchRoutes = require('@/routes/v1/search.route')

/** Users APIs */
router.use('/users', userRoutes)
/** Auth APIs */
router.use('/auth', authRoutes)
/** Song APIs */
router.use('/song', songRoutes)
/** Album APIs */
router.use('/album', albumRoutes)
/** Genre APIs */
router.use('/genre', genreRoutes)
/** Player APIs */
router.use('/player', playerRoutes)
/** Playlist APIs */
router.use('/playlist', playlistRoutes)
/** Library APIs */
router.use('/library', libraryRoutes)
/** Follow APIs */
router.use('/follow', followRoutes)
/** Search APIs */
router.use('/search', searchRoutes)

module.exports = router