'use strict'
require('dotenv').config()

const next = require('next')
const express = require('express')
const session = require('express-session')
const createError = require('http-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const passport = require('passport')
const RedisStore = require('connect-redis')(session)

const models = require('./db/models')
const redisClient = require('./db/redis')
const indexRouter = require('./routes/index')
const { getEnvPrefix } = require('./util/environment')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const port = normalizePort(process.env.PORT || '3000')

nextApp.prepare().then(() => {
  const app = express()

  app.set('port', port)

  // Logging
  const sensitiveKeys = []
  morgan.token('body', function(req) {
    let cleanedBody = Object.assign({}, req.body)
    sensitiveKeys.forEach(key => delete cleanedBody[key])
    let stringifiedBody = JSON.stringify(cleanedBody)
    if (stringifiedBody.length > 10000) {
      stringifiedBody = stringifiedBody.substr(0, 10000)
    }
    return stringifiedBody
  })

  const logFormat = dev ? 'dev' : ':status :method :url :body :response-time ms'
  app.use(morgan(logFormat))

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())

  app.get('*', (req, res) => handle(req, res))

  // app.use(express.static(path.join(__dirname, 'public')))

  // Redis session middleware with passport
  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
        prefix: `sess-${getEnvPrefix()}:`,
      }),
      secret: process.env.SESSION_SECRET || 'rebloom',
      resave: false,
      saveUninitialized: true,
      logErrors: true,
    })
  )

  app.use(function(req, res, next) {
    if (!req.session) return next(new Error('Error creating session'))
    next()
  })
  app.use(passport.initialize())
  app.use(passport.session())

  // app.use(express.static(path.join(__dirname, 'public')))

  app.use('/api', indexRouter)

  app.use(function(err, req, res, next) {
    console.log('ERR:', err)
    res.status(err.status || 500).send({
      message: err.message,
    })
  })

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404))
  })

  // error handler
  app.use(function(err, req, res, next) {
    console.log(err)
    console.log('Cannot find route', err.message)
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })

  // Creates all tables if they doesn't exist in database
  models.sequelize.sync().then(() => {
    app.listen(port, err => {
      if (err) throw err
      console.log(`\n\nListening on http://localhost:${port}\n\n`)
    })
  })
})

function normalizePort(val) {
  var port = parseInt(val, 10)
  if (isNaN(port)) return val
  if (port >= 0) return port
  return false
}
