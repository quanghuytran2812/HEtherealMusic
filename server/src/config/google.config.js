const { google } = require('googleapis')
const { env } = require('./environment.config')

exports.oauth2Client = new google.auth.OAuth2(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  'postmessage'
)