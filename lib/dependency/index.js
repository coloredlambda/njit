import { asValue, asFunction, createContainer } from 'awilix'

// Env vars
import config from '../../config'

// Utils
import { createCreateLogger } from '../util/logger'

// Storage
import { createCreateMongoConnection, createModels } from '../storage/mongodb'

const container = createContainer()
container.register('config', asValue(config))
container.register('createLogger', asFunction(createCreateLogger).scoped())
container.register('createMongoConnection', asFunction(createCreateMongoConnection).scoped())
container.register('models', asFunction(createModels).scoped())

export default () => container
