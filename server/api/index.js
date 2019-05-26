const authApi = require('./auth')

function api(server) {
  server.use('/api/v1/auth', authApi)
}

module.exports = api
