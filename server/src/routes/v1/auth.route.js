const { authController } = require('@/controllers')
const { authValidation } = require('@/validations')

const router = require('express').Router()

router.post('/login-with-gmail', authValidation.login, authController.loginWithGmail)
router.put('/verify-account', authValidation.verifyAccount, authController.verifyAccount)
router.get('/get-credential-from-code', authController.getCredentialFromCode)
router.get('/check-user-from-email/:email', authController.checkUserFromEmail)
router.get('/logout', authController.logout)
router.get('/refresh-token', authController.refreshToken)

module.exports = router