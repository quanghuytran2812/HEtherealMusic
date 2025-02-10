const { env } = require('@/config/environment.config')

const WHITELIST_DOMAINS = [
  env.CLIENT_URL
]

const enumData = {
  userType: ['user', 'admin', 'artist'],
  gender: ['male', 'female', 'other']
}

module.exports = { WHITELIST_DOMAINS, enumData }