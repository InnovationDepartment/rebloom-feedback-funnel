'use strict'
require('dotenv').config()

const next = require('next')
const history = require('connect-history-api-fallback')
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const session = require('express-session')
const passport = require('passport')
const RedisStore = require('connect-redis')(session)

const redisClient = require('./db/redis')
const indexRouter = require('./routes/index')
const { getEnvPrefix } = require('./util/environment')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const app = express()
const port = normalizePort(process.env.PORT || '3000')

nextApp.prepare().then(() => {
  app.set('port', port)

  // view engine setup
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')

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

  const logFormat =
    process.env.NODE_ENV === 'development'
      ? 'dev'
      : ':status :method :url :body :response-time ms'
  app.use(morgan(logFormat))

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())

  // All *.js routes except for /admin will be appended with .gz to get compressed file
  app.get(/^\/(?!admin).*\.js\/?$/, function(req, res, next) {
    req.url = req.url + '.gz'
    res.set('Content-Encoding', 'gzip')
    res.set('Content-Type', 'text/javascript')
    next()
  })

  app.use(express.static(path.join(__dirname, 'public')))

  app.use(
    history({
      rewrites: [
        {
          from: /^\/api\/\w+/,
          to: context => context.parsedUrl.pathname,
        },
        {
          from: /^\/admin/,
          to: context => context.parsedUrl.pathname,
        },
        {
          from: /^\/admin\/queue\/?/,
          to: context => context.parsedUrl.pathname,
        },
      ],
    })
  )

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

  app.use(express.static(path.join(__dirname, 'public')))

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
})

function normalizePort(val) {
  var port = parseInt(val, 10)
  if (isNaN(port)) return val
  if (port >= 0) return port
  return false
}

module.exports = { app: nextApp }
