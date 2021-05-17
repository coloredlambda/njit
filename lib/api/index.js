import express from 'express'
import { defaultTo, prop } from '@meltwater/phi'

const api = express.Router()

export const successCodes = {
  get: 200,
  post: 201
}

export const getSuccessCode = method => defaultTo(200, prop(method, successCodes))

export const createHandleRequestResponse = handler => ({ path, method }) => {
  api[method](path, async (req, res) => {
    try {
      const output = await handler({ ...req.params, ...req.body })
      const successCode = getSuccessCode(method)
      return res.status(successCode).send(output)
    } catch (e) {
      return res.status(400).send(e)
    }
  })
}

export default ({ userController }) => {
  const endpointInformation = [
    { handler: userController.register, path: '/user', method: 'post' }
  ]

  endpointInformation.map(({ handler, path, method }) => createHandleRequestResponse(handler)({ path, method }))

  return { api, endpointInformation }
}
