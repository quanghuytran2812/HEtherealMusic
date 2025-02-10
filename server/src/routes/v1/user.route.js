const router = require('express').Router()
const { userValidation } = require('@/validations')
const { userController } = require('@/controllers')
const { authMiddleware } = require('@/middlewares/authMiddleware')

router.post('/sign-up-with-gmail', userValidation.createUser, userController.createUser)
router.get('/me', authMiddleware.isAuthorized, userController.getMe)

module.exports = router