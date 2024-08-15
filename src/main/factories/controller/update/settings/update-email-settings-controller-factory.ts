import { UpdateEmailSettingsControllerAdapter } from '@/application/controller/update';
import { updateMemberSettingsControllerFactory } from './update-member-settings-controller-factory';

export const updateEmailSettingsControllerAdapterFactory = (): UpdateEmailSettingsControllerAdapter => {
  const updateMemberSettingsController = updateMemberSettingsControllerFactory()
  const updateEmailSettingsControllerAdapter = new UpdateEmailSettingsControllerAdapter(updateMemberSettingsController)
  return updateEmailSettingsControllerAdapter
}