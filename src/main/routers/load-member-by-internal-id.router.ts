import { Router } from 'express'
import { expressAdapter } from '../adapters'
import sm from '@adamsfoodservice/shared-modules'
import { storage } from '@/application/storage/storage'
import { loadMemberByInternalIdControllerFactory } from '../factories/controller/load-member-by-internal-id-controller-factory'

const fakeAuthMiddleware = (req: any, res: any, next: any): void => {
  new sm.Hooks.AsyncScope(() => {
    storage.currentUser.set<{email: string}>({ email: 'john@gmail.com' })
    next()
  })
}

export const loadMemberByInternalIdRouter = (router: Router): void => {
  router.get('/load/internal_id/:id', fakeAuthMiddleware, expressAdapter(loadMemberByInternalIdControllerFactory()))
}
