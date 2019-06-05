// For usage with asynchrounous Express endpoint handler functions.
// Automatically catches Promise rejections and routes them to catch-all error handler.
//
// Usage:
//
//  app.get('/route', asyncWrapper(async (req, res, next) => {
//    await somethingAsync()
//    res.status(200).send()
//  }))

const asyncWrapper = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

module.exports = asyncWrapper
