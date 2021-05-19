import { isNilOrEmpty } from '@meltwater/phi'

export const config = {
  type: 'object',
  properties: {
    id: { type: 'string' }
  },
  required: [],
  additionalProperties: true
}

export default ({
  models,
  createValidate
}) => async input => {
  const { User, Post } = models
  const validate = createValidate(config)
  const { id } = validate(input)
  const { user } = input

  // Checking user exists
  const existingUser = await User.findById(user.id)
  if (isNilOrEmpty(existingUser)) throw new Error('UserNotExist')

  if (isNilOrEmpty(id)) return Post.find({ user: existingUser._id })
  return Post.findOne({ user: existingUser._id, _id: id })
}
