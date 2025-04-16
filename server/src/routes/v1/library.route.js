const { libraryController } = require('@/controllers')
const { authMiddleware } = require('@/middlewares/auth.middleware')
const { libraryValidation } = require('@/validations')

const router = require('express').Router()

router.post('/create-new-library', authMiddleware.isAuthorized, libraryValidation.createNewLibrary, libraryController.createNewLibrary)
router.delete('/delete-item-from-library/:track', authMiddleware.isAuthorized, libraryController.deleteItemFromLibrary)
router.get('/get-library-by-user', authMiddleware.isAuthorized, libraryController.getLibraryByUserId)

module.exports = router