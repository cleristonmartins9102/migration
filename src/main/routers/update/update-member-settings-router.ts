import { Router } from 'express';
import { expressAdapter } from '@/main/adapters';
import { updatePushSettingsControllerAdapterFactory, updateSmsSettingsControllerAdapterFactory } from '@/main/factories/controller';

export const updateMemberSettingsRouter = (router: Router): void => {
  router.post('/update-sms-notifications', expressAdapter(updateSmsSettingsControllerAdapterFactory()))
  router.post('/update-push-notifications', expressAdapter(updatePushSettingsControllerAdapterFactory()))
}