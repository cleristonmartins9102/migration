import { Router, Express } from 'express'
import { createMemberRouter, deleteMemberRouter, acceptMemberRouter, loadMemberByInternalIdRouter, updateMemberRouter } from '../routers'
import { updateMemberSettingsRouter } from '../routers/update/update-member-settings-router'
import { updateWalletBalanceRouter } from '../routers/update/wallet/update-wallet-balance-router'

export const setupRouters = async (app: Express): Promise<void> => {
  const router = Router()
  app.use('/api/member/v1', router)
  createMemberRouter(router)
  updateMemberRouter(router)
  loadMemberByInternalIdRouter(router)
  acceptMemberRouter(router)
  deleteMemberRouter(router)
  updateMemberSettingsRouter(router)
  updateWalletBalanceRouter(router)
}
