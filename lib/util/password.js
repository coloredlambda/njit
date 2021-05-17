import bcrypt from 'bcryptjs'

export const createHashPassword = () => async password => {
  return bcrypt.hash(password, 8)
}

export const createComparePassword = () => async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword)
}