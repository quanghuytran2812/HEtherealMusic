const { env } = require('@/config/environment.config')
const { ApiError } = require('@/utils/apiError.utils')
const { WHITELIST_DOMAINS } = require('@/utils/constants.utils')
const { StatusCodes } = require('http-status-codes')

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin && env.BUILD_MODE === 'development') {
      return callback(null, true)
    }

    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    return callback(
      new ApiError(
        StatusCodes.FORBIDDEN,
        `${origin} not allowed by our CORS Policy.`
      )
    )
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,
  credentials: true
}

module.exports = {
  corsOptions
}
