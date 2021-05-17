import dotenv from 'dotenv'
import { defaultTo, equals } from 'ramda'
import { name as applicationName } from '../package.json'

dotenv.config({})

export default ({
  applicationName,
  port: defaultTo(5000, process.env.PORT),
  database: {
    mongodb: {
      uri: defaultTo('mongodb://localhost:27017/njit', process.env.MONGODB_DATABASE_URI),
      useUnifiedTopology: equals('true', process.env.MONGODB_USE_UNIFIED_TOPOLOGY),
      useNewUrlParser: equals('true', process.env.MONGODB_USE_NEW_URL_PARSER)
    }
  }
})
