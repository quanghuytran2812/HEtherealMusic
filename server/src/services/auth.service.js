const { env } = require('@/config/environment.config')
const { oauth2Client } = require('@/config/google.config')
const { User } = require('@/models')
const ApiError = require('@/utils/ApiError')
const { generateToken, verifyToken } = require('@/utils/jwtProvider')
const { StatusCodes } = require('http-status-codes')

/**
 * Authenticates a user using Gmail credentials.
 *
 * @param {Object} userBody - Contains user login data.
 * @param {string} userBody.email - User's email address.
 * @param {string} userBody.password - User's password.
 * @param {string} userBody.typeLogin - Type of login ('password' or 'google').
 *
 * @returns {Object} - Contains success status, message, accessToken, and refreshToken.
 *
 * @throws {ApiError} - If account is not found, account is locked, email is not verified,
 *                      invalid password is provided, or incorrect login type is used.
 */
const loginWithGmail = async (userBody) => {
  const { email, password, typeLogin } = userBody
  // If it's a regular Gmail login
  const existsUser = await User.checkUserFromEmail(email)

  if (!existsUser) throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')
  if (existsUser.isDeleted) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your account has been locked due to too many unsuccessful login attempts. Please contact support!')
  if (!existsUser.verified_email) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your email has not been verified!')

  if (existsUser?.password && typeLogin == 'password') {
    const isPasswordValid = await User.comparePassword(password, existsUser.password)
    if (!isPasswordValid) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Invalid email or password!')
  } else if (existsUser?.password && typeLogin == 'google') {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your account does not login with Google!')
  } else if (!existsUser?.password && typeLogin == 'password') {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your account does not login with password!')
  }

  // Create JWT token
  const accessToken = await generateToken(
    { uid: existsUser._id },
    env.ACCESS_TOKEN_SECRET_SIGNATURE,
    env.ACCESS_TOKEN_LIFE
  )
  const refreshToken = await generateToken(
    { uid: existsUser._id },
    env.REFRESH_TOKEN_SECRET_SIGNATURE,
    env.REFRESH_TOKEN_LIFE
  )

  return {
    success: !!existsUser,
    message: 'Login successfully!',
    accessToken: accessToken,
    refreshToken: refreshToken
  }
}

/**
 * Refreshes the access token using the provided refresh token.
 * @param {string} clientRefreshToken - The refresh token provided by the client.
 * @returns {Promise<{accessToken: string}>} - New access token.
 * @throws {ApiError} - If the refresh token is invalid or expired.
 */
const refreshToken = async (clientRefreshToken) => {
  const refreshTokenDecoded = await verifyToken(
    clientRefreshToken,
    env.REFRESH_TOKEN_SECRET_SIGNATURE
  )

  if (!refreshTokenDecoded) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      'Unauthorized! Please login again!'
    )
  }
  const accessToken = await generateToken(
    { uid: refreshTokenDecoded.uid },
    env.ACCESS_TOKEN_SECRET_SIGNATURE,
    env.ACCESS_TOKEN_LIFE
  )
  return { accessToken: accessToken }
}

/**
 * Verify user account
 * @param {Object} data - Verify data
 * @param {string} data.email - User email
 * @param {string} data.token - Verify token
 * @returns {Object} - Verify result
 * @throws {ApiError} - If user not found, email has already been verified, or invalid token
 */
const verifyAccount = async (data) => {
  const { email, token } = data

  const existsUser = await User.checkUserFromEmail(email)

  if (!existsUser) throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')
  if (existsUser.verified_email) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Your email has already been verified!')
  if (token != existsUser.verifyToken) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Invalid token!')

  const updatedData = {
    verified_email: true,
    verifyToken: null
  }

  const updatedUser = await User.updateUser(existsUser._id, updatedData)

  return { success: !!updatedUser }
}

/**
 * Get user credentials from authorization code
 * @param {string} code - Authorization code from Google OAuth
 * @returns {Promise<{email: string, name: string, verified_email: boolean, picture: string}>} - User credentials
 * @throws {ApiError} - If the email already exists
 */
const getCredentialFromCode = async (code) => {
  const googleResponse = await oauth2Client.getToken(code)
  oauth2Client.setCredentials(googleResponse.tokens)

  const userResponse = await oauth2Client.request({
    url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`,
    method: 'GET'
  })

  const { email, name, verified_email, picture } = userResponse.data

  const alreadyExistUser = await User.checkUserFromEmail(email)
  if (alreadyExistUser) {
    return { email }
  }

  return {
    email,
    name,
    verified_email,
    picture
  }
}

/**
 * Check if user exists by email
 * @param {string} email
 * @returns {Promise<User | null>}
 */
const checkUserFromEmail = async (email) => {
  const user = await User.checkUserFromEmail(email)
  return user
}

module.exports = {
  loginWithGmail,
  getCredentialFromCode,
  checkUserFromEmail,
  refreshToken,
  verifyAccount
}