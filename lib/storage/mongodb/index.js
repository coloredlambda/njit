import mongoose from 'mongoose'
import { user, post, passwordResetToken } from './models'

export const compileModel = ({ name, schema }) => {
  const compiledSchema = mongoose.Schema(schema, { timestamps: true })
  return mongoose.model(name, compiledSchema)
}

export const createCreateMongoConnection = ({ config, createLogger }) => async () => {
  const log = createLogger('databaseConnection')
  const { database: { mongodb: { uri, ...options } } } = config
  await mongoose.connect(uri, { useNewUrlParser: true, ...options })
  log('Connection to mongodb has been made at', uri)
}

export const createModels = () => ({
  User: compileModel({ name: 'user', schema: user }),
  Post: compileModel({ name: 'post', schema: post }),
  PasswordResetToken: compileModel({ name: 'passwordResetToken', schema: passwordResetToken })
})
