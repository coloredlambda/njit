import { isNilOrEmpty } from '@meltwater/phi'

export default ({ verifyPayload, config }) => async (req, res, next) => {
  const { authentication: { jwt: { secretKey } } } = config
  const { token } = req.headers
  const payload = await verifyPayload(token, secretKey)
  if (isNilOrEmpty(payload)) throw new Error('UserSessionExpired')
  req.user = payload
  next()
}
