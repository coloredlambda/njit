import createDepContainer from './dependency'
import server from './server'

// Introduce dependency injection
const container = createDepContainer()
const config = container.resolve('config')
const createLogger = container.resolve('createLogger')
const createMongoConnection = container.resolve('createMongoConnection')
const endpoints = container.resolve('api')

export const startServer = async (config) => {
  const log = createLogger('server')
  const { port, endpoint: endpointUrl } = config

  // Starting DB
  await createMongoConnection()

  // Start server
  await server.listen(port, () => {
    // Printing server information. This is just debug for demo
    for (let i = 0; i < endpoints.endpointInformation.length; i++) {
      const endpoint = endpoints.endpointInformation[i]
      log('Path -', endpointUrl + endpoint.path, 'Method -', endpoint.method)
    }
  })
}

startServer(config).catch(console.error)
