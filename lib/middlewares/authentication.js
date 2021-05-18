import { isNilOrEmpty } from '@meltwater/phi'

export default ({ verifyPayload }) => async (req, res, next) => {
  const { token } = req.headers
  const payload = await verifyPayload(token)
  if (isNilOrEmpty(payload)) throw new Error('UserSessionExpired')
  req.user = payload
  next()
}
