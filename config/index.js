import dotenv from 'dotenv'
import { defaultTo, equals, isNilOrEmpty, when } from '@meltwater/phi'
import { name as applicationName } from '../package.json'

dotenv.config({})

export const throwWhenNoJWT = when(
  isNilOrEmpty,
  () => { throw new Error('JWT secret not set. Set in env var - JWT_SECRET_KEY') }
)

export default ({
  applicationName,
  port: defaultTo(5000, process.env.PORT),
  database: {
    mongodb: {
      uri: defaultTo('mongodb://localhost:27017/njit', process.env.MONGODB_DATABASE_URI),
      useUnifiedTopology: equals('true', process.env.MONGODB_USE_UNIFIED_TOPOLOGY),
      useNewUrlParser: equals('true', process.env.MONGODB_USE_NEW_URL_PARSER)
    }
  },
  authentication: {
    jwt: {
      secretKey: throwWhenNoJWT(process.env.JWT_SECRET_KEY),
      expirationTime: defaultTo('2 days', process.env.JWT_EXPIRATION_TIME)
    }
  }
})
