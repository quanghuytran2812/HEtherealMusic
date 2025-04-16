const { searchController } = require('@/controllers')

const router = require('express').Router()

router.get('/', searchController.searchItems)

module.exports = router