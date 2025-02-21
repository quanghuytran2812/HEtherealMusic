const { songController } = require('@/controllers')
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

module.exports = router