import { Router, Express } from 'express'
import { createMemberRouter } from '../routers/create-member-router'
import { updateMemberRouter } from '../routers/update-member-router'
import { loadMemberByInternalIdRouter } from '../routers/load-member-by-internal-id.router'

export const setupRouters = async (app: Express): Promise<void> => {
  const router = Router()
  app.use('/api/member/v1', router)
  createMemberRouter(router)
  updateMemberRouter(router)
  loadMemberByInternalIdRouter(router)
}
