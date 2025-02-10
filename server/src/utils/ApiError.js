class ApiError extends Error {
  constructor(statusCode, message) {
    super(message)
    // Set the name of the custom error. If not set, it defaults to "Error".
    this.name = 'ApiError'
    // Assign the HTTP status code to this instance.
    this.statusCode = statusCode
    // Capture the stack trace for debugging purposes.
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = ApiError