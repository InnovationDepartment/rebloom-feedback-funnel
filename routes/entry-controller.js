const express = require('express')
const router = express.Router()
const { Op } = require('sequelize')
const createError = require('http-errors')
// const differenceInDays = require('date-fns/difference_in_days')
// const addDays = require('date-fns/add_days')

const asyncWrapper = require('../middleware/async-wrapper')
const { Entries } = require('../db/models')

router.post(
  '/new-entry',
  asyncWrapper(async (req, res) => {
    const { firstName, lastName, email } = req.body
    const lowerCaseEmail = email.toLowerCase()

    const [entry, isNew] = await Entries.findOrCreateEntry({
      firstName,
      lastName,
      email: lowerCaseEmail,
    })
    
    // Entry already exists with this email and has already been redeemed
    if (!isNew && entry.has_redeemed) throw new createError('existing-entry')

    res.status(200).send(entry)
  })
)

module.exports = router
