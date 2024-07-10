import { Router } from 'express'
import { expressAdapter } from '@/main/adapters'
import { AsyncScope } from '@/infra/adapters/async-scope'
import { authenticatedUser } from '@/infra/utils/auth-var'
import { deliveryFindByIdControllerFactory } from '@/main/factories/controller/delivery-find-by-id-controller-factory'

const fakeAuthMiddleware = (req: any, res: any, next: any): void => {
  new AsyncScope(() => {
    authenticatedUser.set<{email: string}>({ email: 'john@gmail.com' })
    next()
  })
}

export const deliveryFindByIdRouter = (router: Router): void => {
  router.get('/findbyid/:id', fakeAuthMiddleware, expressAdapter(deliveryFindByIdControllerFactory()))
}
