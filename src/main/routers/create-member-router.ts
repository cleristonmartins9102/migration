import { Router } from 'express'
import { expressAdapter } from '../adapters'
import sm from '@adamsfoodservice/shared-modules'
import { storage } from '@/application/storage/storage'
import { createMemberControllerFactory } from '../factories/controller/create-member-controller-factory'

const fakeAuthMiddleware = (req: any, res: any, next: any): void => {
  new sm.Hooks.AsyncScope(() => {
    storage.currentUser.set<{email: string}>({ email: 'john@gmail.com' })
    next()
  })
}

export const createMemberRouter = (router: Router): void => {
  router.put('/create', fakeAuthMiddleware, expressAdapter(createMemberControllerFactory()))
}
