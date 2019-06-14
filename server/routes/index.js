const express = require('express')
const router = express.Router()

const entriesController = require('./entry-controller')

router.use('/entry', entriesController)

module.exports = router
