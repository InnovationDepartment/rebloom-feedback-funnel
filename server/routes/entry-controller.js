const express = require('express')
const router = express.Router()
const { Op } = require('sequelize')
const createError = require('http-errors')

const asyncWrapper = require('../middleware/async-wrapper')
const { Entries, AmazonOrders } = require('../db/models')
const { createShopifyOrder } = require('../util/shopify-api')

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

    if (!id && !email) throw new createError(400, 'invalid')

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
  '/lookup-amazon-order',
  asyncWrapper(async (req, res) => {
    const { order_id, id, email } = req.body
    if (!id && !email) throw new createError(400, 'invalid')

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

    const entry = await Entries.findOne({
      where: {
        id: { [Op.eq]: id },
        email: { [Op.eq]: email.toLowerCase() },
      },
    })

    const updatedEntry = await entry.updateEntry({
      id,
      order_id,
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

router.post(
  '/process-order',
  asyncWrapper(async (req, res) => {
    const order = await createShopifyOrder()
    res.status(200).send(order)
  })
)

router.post(
  '/generate-bonus-order',
  asyncWrapper(async (req, res) => {
    const {
      entryIdentifiers: { id, email },
      shipping,
    } = req.body
    if (!id && !email) throw new createError(400, 'invalid')

    const {
      first_name: shipping_first_name,
      last_name: shipping_last_name,
      address1: shipping_line1,
      address2: shipping_line2,
      city: shipping_city,
      state: shipping_state,
      zip: shipping_zip,
    } = shipping

    const entry = await Entries.findOne({
      where: {
        id: { [Op.eq]: id },
        email: { [Op.eq]: email.toLowerCase() },
      },
    })

    if (!entry.order_valid) throw new createError(400, 'invalid-order')
    const shopifyOrder = await entry.generateShopifyOrder({ ...shipping, email })

    const updatedEntryData = {
      shipping_first_name,
      shipping_last_name,
      shipping_line1,
      shipping_line2,
      shipping_city,
      shipping_state,
      shipping_zip,
      has_redeemed: true,
      shopify_order_id: shopifyOrder.id,
    }

    const updatedEntry = await entry.updateEntry(updatedEntryData)

    res.status(200).send(updatedEntry)
  })
)

module.exports = router
