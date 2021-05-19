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
  const { Post } = models
  const validate = createValidate(config)
  const { id } = validate(input)
  const { user } = input

  // Return all posts
  if (isNilOrEmpty(id)) return Post.find({ user: user.id })

  // Return specific post
  return Post.findOne({ user: user.id, _id: id })
}
