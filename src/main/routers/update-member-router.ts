import { Router } from 'express'
import { expressAdapter } from '../adapters'
import sm from '@adamsfoodservice/shared-modules'
import { storage } from '@/application/storage/storage'
import { updateMemberControllerFactory } from '../factories/controller/update-member-controller-factory'

const fakeAuthMiddleware = (req: any, res: any, next: any): void => {
  new sm.Hooks.AsyncScope(() => {
    storage.currentUser.set<{email: string}>({ email: 'john@gmail.com' })
    next()
  })
}

export const updateMemberRouter = (router: Router): void => {
  router.post('/update', fakeAuthMiddleware, expressAdapter(updateMemberControllerFactory()))
}
