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

}) => async input => {

}
