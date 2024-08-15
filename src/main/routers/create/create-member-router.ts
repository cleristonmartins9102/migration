import { Router } from 'express'
import path from 'path'
import { storage } from '@/application/storage/storage'
import { addFcmTokenControllerFactory } from '../../factories/controller/add/add-fcm-token-controller-factory'
import { expressAdapter } from '@/main/adapters'
import { createMemberControllerFactory } from '@/main/factories/controller'
import { Middleware } from '@adamsfoodservice/shared-middleware'

export const createMemberRouter = (router: Router): void => {
  const permissionPath = path.join(__dirname, '../../../../credentials.json')
  const userAuth = Middleware.userAuth(permissionPath, storage.currentUser)
  router.post('/add-fcm-token', userAuth, expressAdapter(addFcmTokenControllerFactory()))
  router.post('/', expressAdapter(createMemberControllerFactory()))
}
