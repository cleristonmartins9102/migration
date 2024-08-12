import { Router } from 'express';
import { expressAdapter } from '@/main/adapters';
import { updatePushSettingsControllerAdapterFactory, updateSmsSettingsControllerAdapterFactory, updateEmailSettingsControllerAdapterFactory, activatePushAskedSettingsControllerAdapterFactory } from '@/main/factories/controller';
import { Middleware } from '@adamsfoodservice/shared-middleware';
import path from 'path'
import { storage } from '@/application/storage/storage';

export const updateMemberSettingsRouter = (router: Router): void => {
  const userAuth = Middleware.userAuth(path.join(__dirname, '../../../../credentials.json'), storage.currentUser)
  router.post('/update-sms-notifications',  userAuth, expressAdapter(updateSmsSettingsControllerAdapterFactory()))
  router.post('/update-push-notifications', userAuth, expressAdapter(updatePushSettingsControllerAdapterFactory()))
  router.post('/update-email-notifications', userAuth, expressAdapter(updateEmailSettingsControllerAdapterFactory()))
  router.post('/update-push-asked', userAuth, expressAdapter(activatePushAskedSettingsControllerAdapterFactory()))
}