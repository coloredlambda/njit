import express from 'express'
import createDepContainer from './dependency'

// Introduce dependency injection
const container = createDepContainer()
const config = container.resolve('config')
const createLogger = container.resolve('createLogger')
const createMongoConnection = container.resolve('createMongoConnection')

const startServer = async () => {
  const log = createLogger('server')
  const server = express()
  const { port } = config
  await createMongoConnection()
  log('Connection to MongoDB made successfully')
  await server.listen(port, () => {
    log(`Server started on http://localhost:${port}`)
  })
}

startServer().catch(console.error)
