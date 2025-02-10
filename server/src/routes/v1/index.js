const router = require('express').Router()
const userRoutes = require('@/routes/v1/user.route')
const authRoutes = require('@/routes/v1/auth.route')

/** Users APIs */
router.use('/users', userRoutes)
/** Auth APIs */
router.use('/auth', authRoutes)

module.exports = router