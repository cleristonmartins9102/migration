import { Router } from 'express'
import sm from '@adamsfoodservice/shared-modules'
import path from 'path'
import { storage } from '@/application/storage/storage'
import { loadMemberByInternalIdControllerFactory } from '@/main/factories/controller'
import { expressAdapter } from '@/main/adapters'
import { loadMemberByPhoneNumberControllerFactory } from '@/main/factories/controller/load/load-member-by-phone-number-factory'
import { loadAllMemberControllerFactory } from '@/main/factories/controller/load/load-all-members-controller-factory'
import { loadUserWalletControllerFactory } from '@/main/factories/controller/load/load-user-wallet-controller-factory'
import { Middleware } from '@adamsfoodservice/shared-middleware'

const fakeAuthMiddleware = (req: any, res: any, next: any): void => {
  new sm.Hooks.AsyncScope(() => {
    storage.currentUser.set<{email: string}>({ email: 'john@gmail.com' })
    next()
  })
}

export const loadRouters = (router: Router): void => {
  const authMiddleware = Middleware.userAuth(path.join(__dirname, '../../../../credentials.json'), storage.currentUser)
  router.get('/load', fakeAuthMiddleware, expressAdapter(loadAllMemberControllerFactory()))
  router.get('/wallet/load/balance', authMiddleware, expressAdapter(loadUserWalletControllerFactory()))
  router.get('/load/internal_id/:id', fakeAuthMiddleware, expressAdapter(loadMemberByInternalIdControllerFactory()))
  router.get('/load/phone-number/:phone_number', fakeAuthMiddleware, expressAdapter(loadMemberByPhoneNumberControllerFactory()))
}
