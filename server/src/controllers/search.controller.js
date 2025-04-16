const { searchService } = require('@/services')
const catchAsync = require('@/utils/catchAsync.utils')
const { StatusCodes } = require('http-status-codes')

const searchItems = catchAsync(async (req, res) => {
  const { q: query, type } = req.query
  let { limit = 10 } = req.query

  // Convert query params to numbers
  limit = parseInt(limit)

  const results = type
    ? await searchService.searchByType(query, type, limit)
    : await searchService.searchAll(query)

  res.status(StatusCodes.OK).send(results)
})

module.exports = {
  searchItems
}
