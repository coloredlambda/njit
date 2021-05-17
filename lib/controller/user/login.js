import ajv from 'ajv'

export const config = {

}

export default ({ models }) => () => {
  console.log('The models', models)
}
