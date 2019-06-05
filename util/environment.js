const environmentMap = {
  development: 'dev',
  staging: 'staging',
  production: 'prod',
}

const hostnameMap = {
  development: 'http://localhost:8080',
  staging: 'http://staging.gowellpath.com',
  production: 'https://www.gowellpath.com',
}

const getEnvPrefix = () => {
  const env = process.env.NODE_ENV
  return environmentMap[env] || 'dev'
}

const getHostname = () => {
  const env = process.env.NODE_ENV
  return hostnameMap[env]
}

module.exports = {
  getEnvPrefix,
  getHostname,
}
