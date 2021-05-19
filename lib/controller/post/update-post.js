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
  const { Post } = models
  const validate = createValidate(config)
  const { id, text, imageUrl } = validate(input)
  const { user } = input

  return Post.findOneAndUpdate(
    { _id: id, user: user.id },
    { text, imageUrl },
    { new: true }
  )
}
