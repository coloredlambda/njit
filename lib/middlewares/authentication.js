export default ({ verifyPayload, config, errors }) => async (req, res, next) => {
  const { authentication: { jwt: { secretKey } } } = config
  const { token } = req.headers
  try {
    const payload = await verifyPayload(token, secretKey)
    req.user = payload
    next()
  } catch (e) {
    console.log('The error', e)
    throw errors.userNotAuthorized(e)
  }
}
