import express from 'express'
import createDepContainer from './dependency'

// Introduce dependency injection
const container = createDepContainer()
const config = container.resolve('config')
const createLogger = container.resolve('createLogger')
const createMongoConnection = container.resolve('createMongoConnection')
const endpoints = container.resolve('api')
const errorHandlerMiddleware = container.resolve('errorHandlerMiddleware')

const startServer = async () => {
  const log = createLogger('server')
  const { port, endpoint: endpointUrl } = config

  // Starting DB
  await createMongoConnection()

  // Starting server
  const server = express()
  server.use(express.json())
  server.use(endpoints.api)
  server.use(errorHandlerMiddleware)

  await server.listen(port, () => {
    // Printing server information. This is just debug for demo
    for (let i = 0; i < endpoints.endpointInformation.length; i++) {
      const endpoint = endpoints.endpointInformation[i]
      log('Path -', endpointUrl + endpoint.path, 'Method -', endpoint.method)
    }
  })
}

startServer().catch(console.error)
