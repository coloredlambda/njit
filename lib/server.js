import express from 'express'
import createDepContainer from './dependency'

// Introduce dependency injection
const container = createDepContainer()
const endpoints = container.resolve('api')
const errorHandlerMiddleware = container.resolve('errorHandlerMiddleware')

const server = express()

// Registering middlewares
server.use(express.json())
server.use(endpoints.api)
server.use(errorHandlerMiddleware)

export default server
