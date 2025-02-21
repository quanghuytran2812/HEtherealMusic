const { authService } = require('@/services')
const catchAsync = require('@/utils/catchAsync.utils')
const { StatusCodes } = require('http-status-codes')

const loginWithGmail = catchAsync(async (req, res) => {
  const user = await authService.loginWithGmail(req.body)
  res.cookie('accessToken', user.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
  res.cookie('refreshToken', user.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
  res
    .status(StatusCodes.OK)
    .send({ success: user.success, message: user.message })
})

const logout = catchAsync(async (req, res) => {
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
  res.status(StatusCodes.NO_CONTENT).send()
})

const refreshToken = catchAsync(async (req, res) => {
  const user = await authService.refreshToken(req.cookies?.refreshToken)

  res.cookie('accessToken', user.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  res.status(StatusCodes.NO_CONTENT).send()
})

const verifyAccount = catchAsync(async (req, res) => {
  const user = await authService.verifyAccount(req.body)
  res.status(StatusCodes.OK).send(user)
})

const getCredentialFromCode = catchAsync(async (req, res) => {
  const { code } = req.query
  const credential = await authService.getCredentialFromCode(code)
  res.status(StatusCodes.OK).json(credential)
})

const checkUserFromEmail = catchAsync(async (req, res) => {
  const { email } = req.params
  const user = await authService.checkUserFromEmail(email)
  res.status(StatusCodes.OK).json({ hasUser: !!user })
})

module.exports = {
  loginWithGmail,
  getCredentialFromCode,
  checkUserFromEmail,
  logout,
  refreshToken,
  verifyAccount
}
