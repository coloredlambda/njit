import { isNilOrEmpty, isNotNilOrEmpty, isFalsy, pick } from '@meltwater/phi'

export const config = {
  type: 'object',
  properties: {
    token: { type: 'string' },
    currentPassword: { type: 'string' },
    newPassword: { type: 'string' },
    email: { type: 'string' }
  },
  required: ['email', 'newPassword'],
  additionalProperties: true
}

export const createChangePasswordUsingToken = ({
  PasswordResetToken,
  User,
  hashPassword,
  comparePassword
}) => async ({ email, newPassword, token }) => {
  // Finding existing token
  const existingToken = await PasswordResetToken.findOne({ email })
  if (isNilOrEmpty(existingToken)) throw new Error('TokenNotExist')

  // Validating token
  const isTokenCorrect = await comparePassword({ password: token, hashedPassword: existingToken.token })
  if (isFalsy(isTokenCorrect)) throw new Error('TokenNotValid')

  // Hashing new password
  const hashedPassword = await hashPassword(newPassword)
  const userWithUpdatedPassword = await User.findByIdAndUpdate(
    existingToken.user,
    { password: hashedPassword },
    { new: true }
  )
  return pick(['email'], userWithUpdatedPassword)
}

export const createChangePasswordUsingCurrentPassword = ({
  User,
  comparePassword,
  hashPassword
}) => async ({ email, currentPassword, newPassword }) => {
  // Finding existing user
  const existingUser = await User.findOne({ email })
  if (isNilOrEmpty(existingUser)) throw new Error('UserNotExist')

  // Validating password
  const isPasswordCorrect = await comparePassword({ password: currentPassword, hashedPassword: existingUser.password })
  if (isFalsy(isPasswordCorrect)) throw new Error('PasswordNotValid')

  // Hashing new password
  const hashedPassword = await hashPassword(newPassword)
  const userWithUpdatedPassword = await User.findByIdAndUpdate(
    existingUser._id,
    { password: hashedPassword },
    { new: true }
  )
  return pick(['email'], userWithUpdatedPassword)
}

export default ({
  models,
  createValidate,
  createLogger,
  hashPassword,
  comparePassword
}) => async input => {
  const log = createLogger('user:change-password')
  const { User, PasswordResetToken } = models
  const validate = createValidate(config)
  const { email, newPassword, currentPassword, token } = validate(input)

  log('Changing user password')

  if (isNotNilOrEmpty(token)) {
    log('Changing password using reset token')
    const changePasswordUsingToken = createChangePasswordUsingToken({
      PasswordResetToken,
      User,
      hashPassword,
      comparePassword
    })
    return changePasswordUsingToken({ email, newPassword, token })
  }

  log('Changing password using current password')
  const changePasswordUsingCurrentPassword = createChangePasswordUsingCurrentPassword({
    User,
    comparePassword,
    hashPassword
  })
  return changePasswordUsingCurrentPassword({ email, currentPassword, newPassword })
}
