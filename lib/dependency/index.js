import { asValue, asFunction, createContainer } from 'awilix'

// Env vars
import config from '../../config'

// Utils
import { createCreateLogger } from '../util/logger'
import { createCreateValidate } from '../util/validate'
import { createComparePassword, createHashPassword, createVerifyPayload, createSignPayload } from '../util/authentication'

// Storage
import { createCreateMongoConnection, createModels } from '../storage/mongodb'

// Controllers
import createUserController from '../controller/user'

// Routes
import createApi from '../api'

// Middlewares
import createAuthenticationMiddleware from '../middlewares/authentication'

const container = createContainer()
container.register('config', asValue(config))
container.register('createLogger', asFunction(createCreateLogger).scoped())
container.register('createValidate', asFunction(createCreateValidate).scoped())
container.register('comparePassword', asFunction(createComparePassword).scoped())
container.register('hashPassword', asFunction(createHashPassword).scoped())
container.register('verifyPayload', asFunction(createVerifyPayload).scoped())
container.register('signPayload', asFunction(createSignPayload).scoped())
container.register('createMongoConnection', asFunction(createCreateMongoConnection).scoped())
container.register('models', asFunction(createModels).scoped())
container.register('authenticationMiddleware', asFunction(createAuthenticationMiddleware).scoped())
container.register('userController', asFunction(createUserController).scoped())
container.register('api', asFunction(createApi).scoped())

export default () => container
