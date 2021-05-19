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
  comparePassword,
  errors
}) => async ({ email, newPassword, token }) => {
  // Finding existing token
  const existingToken = await PasswordResetToken.findOne({ email })
  if (isNilOrEmpty(existingToken)) throw new errors.UnauthorizedUser('Unauthorized user')

  // Validating token
  const isTokenCorrect = await comparePassword({ password: token, hashedPassword: existingToken.token })
  if (isFalsy(isTokenCorrect)) throw new errors.UnauthorizedUser('Unauthorized user')

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
  hashPassword,
  errors
}) => async ({ email, currentPassword, newPassword }) => {
  // Finding existing user
  const existingUser = await User.findOne({ email })
  if (isNilOrEmpty(existingUser)) throw new errors.UnauthorizedUser('Unauthorized user')

  // Validating password
  const isPasswordCorrect = await comparePassword({ password: currentPassword, hashedPassword: existingUser.password })
  if (isFalsy(isPasswordCorrect)) throw new errors.UnauthorizedUser('Unauthorized user')

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
  comparePassword,
  errors
}) => async input => {
  const log = createLogger('user:change-password')
  const { User, PasswordResetToken } = models
  const validate = createValidate(config)
  const { email, newPassword, currentPassword, token } = validate(input)

  log('Changing user password')
  // If token exists, we use token to reset password
  if (isNotNilOrEmpty(token)) {
    log('Changing password using reset token')
    const changePasswordUsingToken = createChangePasswordUsingToken({
      PasswordResetToken,
      User,
      hashPassword,
      comparePassword,
      errors
    })
    return changePasswordUsingToken({ email, newPassword, token })
  }

  log('Changing password using current password')
  // If current password exists, we use current password to reset password
  const changePasswordUsingCurrentPassword = createChangePasswordUsingCurrentPassword({
    User,
    comparePassword,
    hashPassword,
    errors
  })
  return changePasswordUsingCurrentPassword({ email, currentPassword, newPassword })
}
