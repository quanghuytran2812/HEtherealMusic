const { genreController } = require('@/controllers')
const { genreValidation } = require('@/validations')

const router = require('express').Router()

router.get('/get-all-genres', genreController.getAllGenres)
router.post('/create-new-genre', genreValidation.createNewGenre, genreController.createNewGenre)
router.get('/get-genre-by-id/:genreId', genreController.getGenreById)

module.exports = router