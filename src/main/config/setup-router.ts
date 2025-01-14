import { Router, Express } from 'express'
import { createMemberRouter, deleteMemberRouter, acceptMemberRouter, loadRouters, updateMemberRouter } from '../routers'
import { updateMemberSettingsRouter } from '../routers/update/member/update-member-settings-router'
import { updateWalletBalanceFromErpDataRouter } from '../routers/update/wallet/update-wallet-balance-from-erp-data-router'
import { rejectMemberRouter } from '../routers/reject'
import { createAuditRouter } from '../routers/create/create-audit-router'

export const setupRouters = async (app: Express): Promise<void> => {
  const router = Router()
  app.use('/api', router)
  createMemberRouter(router)
  updateMemberRouter(router)
  loadRouters(router)
  acceptMemberRouter(router)
  deleteMemberRouter(router)
  updateMemberSettingsRouter(router)
  updateWalletBalanceFromErpDataRouter(router)
  rejectMemberRouter(router)
  createAuditRouter(router)
}
