import { isNilOrEmpty } from '@meltwater/phi'

export const config = {
  type: 'object',
  properties: {
    text: { type: 'string' },
    fileUrl: { type: 'string' }
  },
  required: ['text'],
  additionalProperties: true
}

export default ({
  models,
  createValidate
}) => async input => {
  const { User, Post } = models
  const validate = createValidate(config)
  const { text, fileUrl } = validate(input)
  const { user } = input

  // Checking user exists
  const existingUser = await User.findById(user.id)
  if (isNilOrEmpty(existingUser)) throw new Error('UserNotExist')

  return await new Post({ text, imageUrl: fileUrl, user: existingUser._id }).save()
}
