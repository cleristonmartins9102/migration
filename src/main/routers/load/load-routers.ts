import { loadAllMemberControllerFactory, loadUserWalletControllerFactory, loadMemberByPhoneNumberControllerFactory, loadMembersByInternalIdBatchControllerFactory, loadMemberByInternalIdControllerFactory } from '@/main/factories/controller'
import { Router } from 'express'
import path from 'path'
import { storage } from '@/application/storage/storage'
import { expressAdapter } from '@/main/adapters'
import { Middleware } from '@adamsfoodservice/shared-middleware'

export const loadRouters = (router: Router): void => {
  const authMiddleware = Middleware.userAuth(path.join(__dirname, '../../../../credentials.json'), storage.currentUser)
  router.get('/load', authMiddleware, expressAdapter(loadAllMemberControllerFactory()))
  router.post('/load/internal-id-batch', authMiddleware, expressAdapter(loadMembersByInternalIdBatchControllerFactory()))
  router.get('/wallet/load/balance', authMiddleware, expressAdapter(loadUserWalletControllerFactory()))
  router.get('/load/internal_id/:id', authMiddleware, expressAdapter(loadMemberByInternalIdControllerFactory()))
  router.get('/load/phone-number/:phone_number', authMiddleware, expressAdapter(loadMemberByPhoneNumberControllerFactory()))
}
