import { Router, Express } from 'express'

export const setupRouters = (app: Express): void => {
  const router = Router()
  app.use('/api/order/v1', router)
}
