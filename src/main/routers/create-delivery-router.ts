import { Router } from 'express'
import { expressAdapter } from '../adapters'
import { createDeliveryControllerFactory } from '../factories/controller'
import { AsyncScope } from '../../infra/adapters/async-scope'
import { authenticatedUser } from '../../infra/utils/auth-var'

const fakeAuthMiddleware = (req: any, res: any, next: any): void => {
  new AsyncScope(() => {
    authenticatedUser.set<{email: string}>({ email: 'john@gmail.com' })
    next()
  })
}

export const createDeliveryRouter = (router: Router): void => {
  router.put('/create', fakeAuthMiddleware, expressAdapter(createDeliveryControllerFactory()))
}
