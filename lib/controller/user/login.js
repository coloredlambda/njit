import { isNilOrEmpty, isFalsy } from '@meltwater/phi'

export const config = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['email', 'password'],
  additionalProperties: false
}

export default ({
  models,
  createValidate,
  createLogger,
  comparePassword,
  signPayload
}) => async input => {
  const log = createLogger('user:login')
  log('Logging in user')
  const validate = createValidate(config)
  const { User } = models
  const validatedInput = validate(input)
  const { email, password } = validatedInput

  // Check email exists
  const existingUser = await User.findOne({ email })
  if (isNilOrEmpty(existingUser)) throw new Error('UserNotFound')

  // Check password is correct
  const isPasswordCorrect = await comparePassword({ password, hashedPassword: existingUser.password })
  if (isFalsy(isPasswordCorrect)) throw new Error('UserNotFound')

  // Generate JWT token
  const token = await signPayload({ email: existingUser.email })
  return { email, token }
}