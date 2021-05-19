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
  signPayload,
  errors
}) => async input => {
  const log = createLogger('user:login')
  log('Logging in user')
  const validate = createValidate(config)
  const { User } = models
  const { email, password } = input
  const validatedInput = validate({ email, password })

  // Check email exists
  const existingUser = await User.findOne({ email: validatedInput.email })
  if (isNilOrEmpty(existingUser)) throw new errors.UnauthorizedUser('Unauthorized user')

  // Check password is correct
  const isPasswordCorrect = await comparePassword({
    password: validatedInput.password,
    hashedPassword: existingUser.password
  })
  if (isFalsy(isPasswordCorrect)) throw new errors.UnauthorizedUser('Unauthorized user')

  // Generate JWT token
  const token = await signPayload({ id: existingUser._id, email: existingUser.email })
  return { email, token }
}
