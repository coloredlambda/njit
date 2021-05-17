import debug from 'debug'

export const createCreateLogger = ({ config }) => logName => {
  const { applicationName } = config
  return debug(`${applicationName}:${logName}`)
}
