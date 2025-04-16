
const { playerController } = require('@/controllers')
const { authMiddleware } = require('@/middlewares/auth.middleware')
const { playerValidation } = require('@/validations')

const router = require('express').Router()

router.post('/create-new-player', authMiddleware.isAuthorized, playerValidation.createNewPlayer, playerController.createNewPlayer)
router.get('/get-recently-played', authMiddleware.isAuthorized, playerController.getRecentlyPlayed)

module.exports = router