import { composeWith, then, tap } from '@meltwater/phi'

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
  hashPassword
}) => async input => {
  const log = createLogger('user:register')
  log('Registering new user')
  const { User } = models
  const validate = createValidate(config)
  const validatedInput = validate(input)
  const hashedPassword = await hashPassword(validatedInput.password)
  const validatedInputWithHashedPassword = { ...validatedInput, password: hashedPassword }

  const registerPipeline = composeWith(then, [
    tap(() => log('Email fired for new user successfully')),
    tap(() => log('New user created successfully')),
    async input => await new User(input).save()
  ])

  return registerPipeline(validatedInputWithHashedPassword)
}
