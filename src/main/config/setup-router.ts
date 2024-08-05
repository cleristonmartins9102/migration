import { Router, Express } from 'express'
import { createMemberRouter } from '../routers/create-member-router'

export const setupRouters = async (app: Express): Promise<void> => {
  const router = Router()
  app.use('/api/member/v1', router)
  createMemberRouter(router)
}
