const { albumController } = require('@/controllers')
const { albumValidation } = require('@/validations')

const router = require('express').Router()

router.post('/create-new-album', albumValidation.createNewAlbum, albumController.createNewAlbum)

module.exports = router