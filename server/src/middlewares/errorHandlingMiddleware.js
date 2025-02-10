const { env } = require('@/config/environment.config')
const { StatusCodes } = require('http-status-codes')

// eslint-disable-next-line no-unused-vars
const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack
  }

  if (env.BUILD_MODE !== 'development') delete responseError.stack
  res.status(responseError.statusCode).json(responseError)
}

module.exports = errorHandlingMiddleware