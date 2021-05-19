import { isNilOrEmpty } from '@meltwater/phi'

export const config = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    text: { type: 'string' },
    imageUrl: { type: 'string' }
  },
  required: ['id'],
  additionalProperties: true
}

export default ({
  models,
  createValidate
}) => async input => {
  const { User, Post } = models
  const validate = createValidate(config)
  const { id, text, imageUrl } = validate(input)
  const { user } = input

  // Checking user exists
  const existingUser = await User.findById(user.id)
  if (isNilOrEmpty(existingUser)) throw new Error('UserNotExist')

  return Post.findOneAndUpdate(
    { _id: id, user: existingUser._id },
    { text, imageUrl },
    { new: true }
  )
}
