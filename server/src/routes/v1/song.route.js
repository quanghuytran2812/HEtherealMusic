const { songController } = require('@/controllers')
const { authMiddleware } = require('@/middlewares/auth.middleware')
const { multerUploadMiddleware } = require('@/middlewares/multerUpload.middleware')
const { songValidation } = require('@/validations')

const router = require('express').Router()

router.post('/create-new-song',
  multerUploadMiddleware.upload.fields([
    { name: 'imageUrl', maxCount: 1 },
    { name: 'audioUrl', maxCount: 1 }
  ]),
  songValidation.createNewSong,
  songController.createNewSong)
router.post('/like-song', authMiddleware.isAuthorized, songController.likeSong)
router.delete('/unlike-song/:songId', authMiddleware.isAuthorized, songController.unlikeSong)
router.get('/get-song-by-id/:songId', songController.getSongById)
router.get('/get-recommended-songs/:songId', songController.getRecommendedSongsByIds)

module.exports = router