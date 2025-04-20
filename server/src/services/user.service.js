const { User, Player, Song } = require('@/models')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs')
const { BrevoEmail } = require('@/utils/brevoEmail.utils')
const { env } = require('@/config/environment.config')
import { v4 as uuidv4 } from 'uuid'
import { CloudinaryProvider } from '@/utils/cloudinary.utils'
import { ApiError } from '@/utils/apiError.utils'
import { pickKeysFromUser } from '@/utils/helper.utils'

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const createUser = async (userBody) => {
  const { email, verified_email, password, imageUrl } = userBody

  // Check if email already exists
  if (await User.checkUserFromEmail(email)) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')
  }

  // Prepare user data
  const userData =
    verified_email && !password
      ? { ...userBody, imageUrl: [imageUrl] }
      : {
        ...userBody,
        password: hashPassword(password),
        verifyToken: uuidv4()
      }

  // Create new user in the database
  const createdUser = await User.createNewUser(userData)

  if (!verified_email && createdUser) {
    // Generate verification token and link
    const verificationLink = `${env.CLIENT_URL}/account/verification?email=${email}&token=${createdUser.verifyToken}`

    // Send verification email
    await sendVerificationEmail(email, verificationLink)
  }

  return { success: !!createdUser, messages: 'Account created successfully!' }
}

const sendVerificationEmail = async (recipientEmail, verificationLink) => {
  const subject = 'Confirm your email address'
  const htmlContent = generateEmailContent(verificationLink)

  await BrevoEmail.sendEmail({ recipientEmail, subject, htmlContent })
}

const logoImage =
  'https://res.cloudinary.com/dvsokroe6/image/upload/v1739503783/users/dcwgzprdkuxqpfgdavvw.png'
const generateEmailContent = (verificationLink) => `
<html>
<head>
  <style>
    .container { max-width: 600px; margin: 0 auto; }
    .header { display: flex; }
    .header img { width: 30px; height: 30px; background: #1ed760; border-radius: 50%; margin-right: 10px; padding: 4px; margin-top: 22px;}
    .header p { font-size: x-large; color: #1ed760;}
    a { text-decoration: none; }
    .content { text-align: center; max-width: 450px; }
    .content .title { color: #000000; font-size: 28px;}
    .content .description { color: #000000; font-size: 18px;}
    .button { display: inline-block; background: #1ed760; padding: 0 30px; border-radius: 50px; }
    .button p { color: #fff; font-size: 14px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <a target="_blank" rel="noopener noreferrer" href="${env.CLIENT_URL}" class="header">
      <img src=${logoImage} alt="HEthereal" />
      <p>HEthereal</p>
    </a>
    <div class="content">
      <p class="title">Keep your account safe.</p>
      <p class="description">Verify your email address so you can access your account and get critical information from us at any time.</p>
      <a class="button" target="_blank" rel="noopener noreferrer" href="${verificationLink}"><p>VERIFY EMAIL</p></a>
    </div>
  </div>
</body>
</html>`

const getMe = async (user) => {
  const { uid } = user
  const response = await User.findUserById(uid)

  const pickedData = pickKeysFromUser(response)
  return { success: !!response, user: pickedData }
}

const updateUser = async (id, reqBody, fileImage) => {
  const existsUser = await User.findUserById(id)

  if (!existsUser)
    throw new ApiError(StatusCodes.NOT_FOUND, 'Account not found!')
  if (existsUser.isDeleted)
    throw new ApiError(
      StatusCodes.NOT_ACCEPTABLE,
      'Your account has been locked due to too many unsuccessful login attempts. Please contact support!'
    )
  if (!existsUser.verified_email)
    throw new ApiError(
      StatusCodes.NOT_ACCEPTABLE,
      'Your email has not been verified!'
    )

  let updateUser = {}
  if (reqBody.current_password && reqBody.new_password) {
    const isPasswordValid = await User.comparePassword(
      reqBody.current_password,
      existsUser.password
    )

    if (!isPasswordValid) {
      throw new ApiError(
        StatusCodes.NOT_ACCEPTABLE,
        'Invalid current password!'
      )
    }

    updateUser = await User.updateUser(existsUser._id, {
      password: hashPassword(reqBody.new_password)
    })
  } else if (fileImage) {
    const uploadedFile = await CloudinaryProvider.streamUpload(
      fileImage.buffer,
      'users',
      'image'
    )

    updateUser = await User.updateUser(existsUser._id, {
      name: reqBody.name,
      imageUrl: existsUser.imageUrl.length > 0 ?
        [...existsUser.imageUrl, uploadedFile.secure_url] : [uploadedFile.secure_url]
    })
  } else {
    updateUser = await User.updateUser(existsUser._id, { name: reqBody.name })
  }

  return { success: !!updateUser }
}

const getRecommendArtists = async (artistIds) => {
  if (artistIds) {
    const uniqueArtistIds = [...new Set(artistIds.split(','))]
    const artists = await User.findRecommendArtists(uniqueArtistIds)
    return artists
  }
}

const getTop = async (userId, type, limit, offset) => {
  try {
    // Validate parameters
    if (!['artists', 'tracks'].includes(type)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid type parameter. Valid values are "artists" or "tracks"')
    }
    // Find the user to ensure they exist
    const user = await User.findUserById(userId)
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    }

    // Get top items from database
    let result
    if (type === 'artists') {
      result = await Player.getTopArtists(userId, limit, offset)
    } else {
      result = await Player.getTopTracks(userId, limit, offset)
    }
    return result
  } catch (error) {
    throw new error
  }
}

const getUserById = async (id) => {
  try {
    const user = await User.findUserById(id)
    return user
  } catch (error) {
    throw new error
  }
}

const getArtistTopTracks = async (artistId) => {
  try {
    const tracks = await Song.getArtistTopTracks(artistId)
    return tracks
  } catch (error) {
    throw new error
  }
}

module.exports = {
  createUser,
  getMe,
  updateUser,
  getRecommendArtists,
  getTop,
  getUserById,
  getArtistTopTracks
}
