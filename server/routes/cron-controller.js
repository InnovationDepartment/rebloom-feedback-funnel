const express = require('express')
const router = express.Router()
const addHours = require('date-fns/add_hours')
const subHours = require('date-fns/sub_hours')
const asyncWrapper = require('../middleware/async-wrapper')
const { fetchAmazonOrderData, requestAmazonReport } = require('./../util/amazon-mws-api')

// Every 4 hours at :05
// Default request interval is 6 hours (5 hours prior + 1 hour after) to cover any gaps between requests
router.post(
  '/request-amazon-report',
  asyncWrapper(async (req, res) => {
    const {
      startDate = subHours(new Date(), 5).toISOString(),
      endDate = addHours(new Date(), 1).toISOString(),
    } = req.body
    // const { startDate = subHours(new Date(), 5), endDate = addHours(new Date(), 1) } = req.body
    await requestAmazonReport(startDate, endDate)
    res.status(200).send()
  })
)

// Every 4 hours at :15
router.post(
  '/fetch-amazon-order-data',
  asyncWrapper(async (req, res) => {
    await fetchAmazonOrderData()
    res.status(200).send()
  })
)

module.exports = router
