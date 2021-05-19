import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const createHashPassword = () => async password => {
  return bcrypt.hash(password, 8)
}

export const createComparePassword = () => async ({ password, hashedPassword }) => {
  console.log('password', password, 'hashedPassword', hashedPassword)
  return await bcrypt.compare(password, hashedPassword)
}

export const createSignPayload = ({ config }) => async payload => {
  const { authentication: { jwt: { secretKey, expirationTime } } } = config
  return jwt.sign(payload, secretKey, { expiresIn: expirationTime })
}

export const createVerifyPayload = ({ config }) => async token => {
  const { authentication: { jwt: { secretKey } } } = config
  return jwt.verify(token, secretKey)
}
