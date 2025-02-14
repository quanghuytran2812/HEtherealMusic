const router = require('express').Router()
const { userValidation } = require('@/validations')
const { userController } = require('@/controllers')
const { authMiddleware } = require('@/middlewares/authMiddleware')
const { multerUploadMiddleware } = require('@/middlewares/multerUploadMiddleware')

router.post('/sign-up-with-gmail', userValidation.createUser, userController.createUser)
router.get('/me', authMiddleware.isAuthorized, userController.getMe)
router.put('/update-user',
  authMiddleware.isAuthorized,
  multerUploadMiddleware.upload.single('imageUrl'),
  userValidation.updateUser,
  userController.updateUser)

module.exports = router