const { followController } = require('@/controllers')
const { authMiddleware } = require('@/middlewares/auth.middleware')
const { followValidation } = require('@/validations')

const router = require('express').Router()

router.post('/follow-user', authMiddleware.isAuthorized, followValidation.createNewFollow, followController.followUser)
router.delete('/unfollow-user/:followerId', authMiddleware.isAuthorized, followController.unfollowUser)
router.get('/get-artists-followed-by-user', authMiddleware.isAuthorized, followController.getArtistsFollowedByUser)
router.get('/get-related-artists/:artistId', authMiddleware.isAuthorized, followController.getRelatedArtists)

module.exports = router