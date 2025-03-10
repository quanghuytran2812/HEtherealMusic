const { albumController } = require('@/controllers')
const { albumValidation } = require('@/validations')

const router = require('express').Router()

router.post('/create-new-album', albumValidation.createNewAlbum, albumController.createNewAlbum)
router.get('/new-release-albums', albumController.getNewReleaseAlbums)
router.get('/get-album-by-id/:albumId', albumController.getAlbumById)
router.get('/get-all-albums-by-artist/:artistId', albumController.getAllAlbumsByArtist)

module.exports = router