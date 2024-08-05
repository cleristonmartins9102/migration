import { Router, Express } from 'express'

export const setupRouters = async (app: Express): Promise<void> => {
  const router = Router()
  app.use('/api/SERVICENAME/v1', router)
}
