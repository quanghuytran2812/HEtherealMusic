const router = require('express').Router()
const { userValidation } = require('@/validations')
const { userController } = require('@/controllers')
const { authMiddleware } = require('@/middlewares/auth.middleware')
const { multerUploadMiddleware } = require('@/middlewares/multerUpload.middleware')

router.post('/sign-up-with-gmail', userValidation.createUser, userController.createUser)
router.get('/me', authMiddleware.isAuthorized, userController.getMe)
router.put('/update-user',
  authMiddleware.isAuthorized,
  multerUploadMiddleware.upload.single('imageUrl'),
  userValidation.updateUser,
  userController.updateUser)
router.get('/recommend-artists', authMiddleware.isAuthorized, userController.getRecommendArtists)
router.get('/top/:type', authMiddleware.isAuthorized, userController.getTop)
router.get('/get-user-by-id/:userId', userController.getUserById)
router.get('/get-artist-top-tracks/:artistId', userController.getArtistTopTracks)

module.exports = router