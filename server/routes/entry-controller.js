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
    const { first_name, last_name, email } = req.body
    const lowerCaseEmail = email.toLowerCase()

    const [entry, isNew] = await Entries.findOrCreateEntry({
      first_name,
      last_name,
      email: lowerCaseEmail,
    })

    // Entry already exists with this email and has already been redeemed
    if (!isNew && entry.has_redeemed) throw new createError('existing-entry')

    res.status(200).send(entry)
  })
)

router.post(
  '/update-entry',
  asyncWrapper(async (req, res) => {
    const {
      entryIdentifiers: { id, email },
      entryInfo,
    } = req.body

    const entry = await Entries.findOne({
      where: {
        id: { [Op.eq]: id },
        email: { [Op.eq]: email.toLowerCase() },
      },
    })

    // Entry already exists with this email and has already been redeemed
    if (entry.has_redeemed) throw new createError('existing-entry')

    const updatedEntry = await entry.updateEntry(entryInfo)

    res.status(200).send(updatedEntry)
  })
)

router.post(
  '/look-up-order',
  asyncWrapper(async (req, res) => {
    const { order_id } = req.body

    // Lookup for Amazon.com orders
    const amazonOrder = await AmazonOrders.findOne({
      where: {
        order_id: { [Op.eq]: order_id },
      },
    })
    if (!amazonOrder) throw new createError(400, 'invalid')

    // Check against our DB to make sure order ID hasn't already been used
    const existingEntry = await Entries.findOne({
      where: {
        order_id: { [Op.eq]: order_id },
      },
    })
    if (existingEntry && existingEntry.has_redeemed) {
      throw new createError(400, 'existing-entry')
    }

    const formattedItems = amazonOrder.items_asins.split(',')

    const entry = await Entries.findOne({
      where: {
        id: { [Op.eq]: id },
        email: { [Op.eq]: email.toLowerCase() },
      },
    })

    const bonus_product = formattedItems.length === 1 ? formattedItems[0] : null
    const updatedEntry = await entry.updateEntry({
      id,
      order_id,
      bonus_product,
      items: formattedItems,
      purchase_date: amazonOrder.order_purchase_date,
      order_valid: true,
    })

    const totalDiscount = amazonOrder.discount.split(',').reduce((sum, discount) => {
      sum += Number(discount)
      return sum
    }, 0)

    const totalAmount = amazonOrder.price.split(',').reduce((sum, discount) => {
      sum += Number(discount)
      return sum
    }, 0)

    const boughtWithMajorDiscount = totalDiscount / totalAmount > 0.3
    if (boughtWithMajorDiscount) throw new createError(400, 'qualify')

    res.status(200).send(updatedEntry)
  })
)

module.exports = router
