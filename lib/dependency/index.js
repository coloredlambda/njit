import { asValue, asFunction, createContainer } from 'awilix'

// Env vars
import config from '../../config'

// Utils
import { createCreateLogger } from '../util/logger'
import { createCreateValidate } from '../util/validate'
import { createComparePassword, createHashPassword, createVerifyPayload, createSignPayload } from '../util/authentication'
import { createSendEmail } from '../util/email'
import { createErrors } from '../util/errors'

// Storage
import { createCreateMongoConnection, createModels } from '../storage/mongodb'

// Controllers
import createUserController from '../controller/user'
import createPostController from '../controller/post'

// Routes
import createApi from '../api'

// Middlewares
import createAuthenticationMiddleware from '../middlewares/authentication'
import createFileUploadMiddleware from '../middlewares/file-upload'
import createErrorHandlerMiddleware from '../middlewares/error-handler'

const container = createContainer()
container.register('config', asValue(config))
container.register('createLogger', asFunction(createCreateLogger).scoped())
container.register('createValidate', asFunction(createCreateValidate).scoped())
container.register('comparePassword', asFunction(createComparePassword).scoped())
container.register('hashPassword', asFunction(createHashPassword).scoped())
container.register('verifyPayload', asFunction(createVerifyPayload).scoped())
container.register('signPayload', asFunction(createSignPayload).scoped())
container.register('sendEmail', asFunction(createSendEmail).scoped())
container.register('errors', asFunction(createErrors).scoped())
container.register('createMongoConnection', asFunction(createCreateMongoConnection).scoped())
container.register('models', asFunction(createModels).scoped())
container.register('authenticationMiddleware', asFunction(createAuthenticationMiddleware).scoped())
container.register('fileUploadMiddleware', asFunction(createFileUploadMiddleware).scoped())
container.register('errorHandlerMiddleware', asFunction(createErrorHandlerMiddleware).scoped())
container.register('userController', asFunction(createUserController).scoped())
container.register('postController', asFunction(createPostController).scoped())
container.register('api', asFunction(createApi).scoped())

export default () => container
