import { isNotNilOrEmpty, pick } from '@meltwater/phi'

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
  hashPassword,
  sendEmail
}) => async input => {
  const log = createLogger('user:register')
  log('Registering new user')
  const { User } = models
  const validate = createValidate(config)
  const { email, password } = input

  // Validate input
  const validatedInput = validate({ email, password })

  // Check user already exists
  const userAlreadyExists = await User.findOne({ email: validatedInput.email })
  if (isNotNilOrEmpty(userAlreadyExists)) throw new Error('UserAlreadyExists')

  // Hash password
  const hashedPassword = await hashPassword(validatedInput.password)

  // Save to DB
  const output = await new User({ ...validatedInput, password: hashedPassword }).save()

  // Send email
  await sendEmail({ to: output.email, text: 'Welcome to my Node JS Intermediate Test demo for TalentQL. You have successfully registered yourself' })

  return pick(['email', 'createdAt', 'updatedAt'], output)
}
