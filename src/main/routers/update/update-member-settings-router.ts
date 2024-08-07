import { Router } from 'express';
import { expressAdapter } from '@/main/adapters';
import { updateSmsSettingsControllerAdapterFactory } from '@/main/factories/controller/update/update-sms-settings-controller-factory';

export const updateMemberSettingsRouter = (router: Router): void => {
  router.post('/update-sms-notifications', expressAdapter(updateSmsSettingsControllerAdapterFactory()))
}