const express = require('express')
const router = express.Router()

const entriesController = require('./entry-controller')
const cronController = require('./cron-controller')

// used for cron job authentication
const cronAuth = (req, res, next) => {
  if (req.body.key !== process.env.CRON_API_KEY) {
    res.status(403).send({
      message: 'Invalid cron api key',
    })
  } else {
    next()
  }
}

router.use('/entry', entriesController)
router.use('/cron', cronAuth, cronController)

module.exports = router
