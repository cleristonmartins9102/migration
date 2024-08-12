import { Router } from 'express'
import { expressAdapter } from '@/main/adapters'
import sm from '@adamsfoodservice/shared-modules'
import { storage } from '@/application/storage/storage'
import { updateWalletBalanceControllerFactory } from '../../../factories/controller/update/wallet/update-wallet/update-wallet-balance-controller-factory'

const fakeAuthMiddleware = (req: any, res: any, next: any): void => {
  new sm.Hooks.AsyncScope(() => {
    storage.currentUser.set<{email: string}>({ email: 'john@gmail.com' })
    next()
  })
}

export const updateWalletBalanceRouter = (router: Router): void => {
  router.post('/update/wallet/balance', fakeAuthMiddleware, expressAdapter(updateWalletBalanceControllerFactory()))
}
