import dotenv from 'dotenv'
import { defaultTo } from '@meltwater/phi'
import { name as applicationName } from '../package.json'

dotenv.config({})

export default ({
  env: defaultTo('production', process.env.NODE_ENV),
  applicationName,
  endpoint: defaultTo('http://localhost:5000', process.env.ENDPOINT),
  port: defaultTo(5000, process.env.PORT),
  database: {
    mongodb: {
      uri: defaultTo('mongodb://localhost:27017/njit', process.env.MONGODB_DATABASE_URI),
      useUnifiedTopology: defaultTo(true, process.env.MONGODB_USE_UNIFIED_TOPOLOGY),
      useNewUrlParser: defaultTo(true, process.env.MONGODB_USE_NEW_URL_PARSER),
      useCreateIndex: defaultTo(true, process.env.MONGODB_USE_CREATE_INDEX)
    }
  },
  authentication: {
    jwt: {
      secretKey: defaultTo('90jw98hnw9uehnfiuhgwu9hg9u', process.env.JWT_SECRET_KEY),
      expirationTime: defaultTo('2 days', process.env.JWT_EXPIRATION_TIME)
    }
  },
  email: {
    host: defaultTo('smtp.gmail.com', process.env.EMAIL_HOST),
    port: defaultTo('587', process.env.EMAIL_PORT),
    username: defaultTo('raaj.burner@gmail.com', process.env.EMAIL_USERNAME),
    password: defaultTo('sobdos-rymJec-sutbi2', process.env.EMAIL_PASSWORD)
  }
})
