import { isNilOrEmpty } from '@meltwater/phi'
import crypto from 'crypto'

export const config = {
  type: 'object',
  properties: {
    email: { type: 'string' }
  },
  required: ['email'],
  additionalProperties: true
}

export default ({
  models,
  createValidate,
  createLogger,
  sendEmail,
  hashPassword
}) => async input => {
  const log = createLogger('user:reset-password')
  const { User, PasswordResetToken } = models
  const validate = createValidate(config)
  const { email } = validate(input)

  log('Resetting user password')

  // Finding user
  const user = await User.findOne({ email })
  if (isNilOrEmpty(user)) { throw new Error('UserNotExist') }

  // Deleting possible existent reset tokens for this user
  await PasswordResetToken.findOneAndDelete({ user: user._id })

  // Generating, hashing and saving reset token
  const token = crypto.randomBytes(32).toString('hex')
  const hashedToken = await hashPassword(token)
  await new PasswordResetToken({ token: hashedToken, email: user.email, user: user._id }).save()

  // Firing email
  await sendEmail({
    to: email,
    subject: 'Password Reset',
    text: `Use change password endpoint to make password change for this demo - ${token}`
  })

  return { token, message: `Use change password endpoint to make password change for this demo - ${token}` }
}
