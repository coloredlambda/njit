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
  const { Post } = models
  const validate = createValidate(config)
  const { text, fileUrl } = validate(input)
  const { user } = input

  return await new Post({ text, imageUrl: fileUrl, user: user.id }).save()
}
