import Ajv from 'ajv'

const ajv = new Ajv()

export const createCreateValidate = ({ errors }) => schema => data => {
  const validate = ajv.compile(schema)
  const isValid = validate(data)
  if (!isValid) throw new errors.BadRequest(validate.errors)
  return data
}
