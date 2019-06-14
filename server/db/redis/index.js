const redis = require('redis')
const {promisify} = require('util')

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
})

redisClient.getAsync = promisify(redisClient.get).bind(redisClient)
redisClient.setexAsync = promisify(redisClient.setex).bind(redisClient)

module.exports = redisClient
