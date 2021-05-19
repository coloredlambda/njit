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
      console.error(e)
      return res.status(400).send({ success: false, error: e })
    }
  })
}

export default ({ userController, authenticationMiddleware }) => {
  const endpointInformation = [
    {
      handler: userController.register,
      path: '/api/v1/account',
      method: 'post'
    },
    {
      handler: userController.login,
      path: '/api/v1/account/login',
      method: 'post'
    },
    {
      handler: userController.resetPassword,
      path: '/api/v1/account/reset-password',
      method: 'post'
    },
    {
      handler: userController.changePassword,
      path: '/api/v1/account/password',
      method: 'put'
    }
  ]

  endpointInformation.map(({ handler, ...ctx }) => createHandleRequestResponse(handler)(ctx))

  return { api, endpointInformation }
}
