import express from 'express'
import createDepContainer from './dependency'

// Introduce dependency injection
const container = createDepContainer()
const config = container.resolve('config')
const createLogger = container.resolve('createLogger')
const createMongoConnection = container.resolve('createMongoConnection')
const endpoints = container.resolve('api')

const startServer = async () => {
  const log = createLogger('server')
  const { port } = config

  // Starting DB
  await createMongoConnection()

  // Starting server
  const server = express()
  server.use(express.json())
  server.use(endpoints.api)
  await server.listen(port, () => {
    const baseUrl = `http://localhost:${port}`
    endpoints.endpointInformation.map(endpoint => {
      log('Path -', baseUrl + endpoint.path, 'Method -', endpoint.method)
    })
  })
}

startServer().catch(console.error)
