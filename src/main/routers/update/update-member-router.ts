import { Router } from 'express'
import { expressAdapter } from '@/main/adapters'
import path from 'path'
import { storage } from '@/application/storage/storage'
import { Middleware } from '@adamsfoodservice/shared-middleware'
import { updateMemberNotificationDecoratorControllerFactory } from '@/main/factories/controller'

export const updateMemberRouter = (router: Router): void => {
  const authMiddleware = Middleware.userAuth(path.join(__dirname, '../../../../credentials.json'), storage.currentUser)
  router.post('/update', authMiddleware, expressAdapter(updateMemberNotificationDecoratorControllerFactory()))
}
