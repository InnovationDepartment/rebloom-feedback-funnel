const express = require('express')
const router = express.Router()
const { Op } = require('sequelize')
const createError = require('http-errors')
const differenceInDays = require('date-fns/difference_in_days')
const addDays = require('date-fns/add_days')

const { Entries } = require('../db/models')
const asyncWrapper = require('../middleware/async-wrapper')

router.post(
  '/new-entry',
  asyncWrapper(async (req, res) => {
    res.status(200).send()
  })
)

module.exports = router
