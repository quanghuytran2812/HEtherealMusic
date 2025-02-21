const router = require('express').Router()
const userRoutes = require('@/routes/v1/user.route')
const authRoutes = require('@/routes/v1/auth.route')
const songRoutes = require('@/routes/v1/song.route')
const albumRoutes = require('@/routes/v1/album.route')
const genreRoutes = require('@/routes/v1/genre.route')

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

module.exports = router