import sm from '@adamsfoodservice/shared-modules'
import path from 'path'

export const setupLogger = async (): Promise<void> => {
  sm.Logging.LoggingSingleton.initialize(path.join(__dirname, '../../../credentials.json'))
}
