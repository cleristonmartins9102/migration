import { Router } from 'express'
import { expressAdapter } from '../adapters'
import { AsyncScope } from '../../infra/adapters/async-scope'
import { authenticatedUser } from '../../infra/utils/auth-var'
import { deleteDeliveryControllerFactory } from '../factories/controller/delete-delivery-controller-factory'

const fakeAuthMiddleware = (req: any, res: any, next: any): void => {
  new AsyncScope(() => {
    authenticatedUser.set<{email: string}>({ email: 'john@gmail.com' })
    next()
  })
}

export const deleteDeliveryRouter = (router: Router): void => {
  router.delete('/delete', fakeAuthMiddleware, expressAdapter(deleteDeliveryControllerFactory()))
}
