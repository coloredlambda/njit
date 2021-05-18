import express from 'express'
import { defaultTo, prop } from '@meltwater/phi'

const api = express.Router()

export const successCodes = {
  get: 200,
  post: 201
}

export const getSuccessCode = method => defaultTo(200, prop(method, successCodes))

export const createHandleRequestResponse = handler => ({ path, method, middlewares = [] }) => {
  api[method](path, ...middlewares, async (req, res) => {
    try {
      const output = await handler({ ...req.params, ...req.body, user: req.user })
      const successCode = getSuccessCode(method)
      return res.status(successCode).send({ success: true, ...output })
    } catch (e) {
      return res.status(400).send({ success: false, error: e })
    }
  })
}

export default ({ userController, authenticationMiddleware }) => {
  const endpointInformation = [
    {
      handler: userController.register,
      path: '/user',
      method: 'post'
    },
    {
      handler: userController.login,
      path: '/user/login',
      method: 'post'
    }
  ]

  endpointInformation.map(({ handler, ...ctx }) => createHandleRequestResponse(handler)(ctx))

  return { api, endpointInformation }
}
