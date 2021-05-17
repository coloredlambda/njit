import Ajv from 'ajv'

const ajv = new Ajv()

export const createCreateValidate = () => schema => data => {
  const validate = ajv.compile(schema)
  const isValid = validate(data)
  if (!isValid) throw validate.errors
  return data
}
