import { UpdatePushSettingsControllerAdapter } from '@/application/controller';
import { updateMemberSettingsControllerFactory } from './update-member-settings-controller-factory';

export const updatePushSettingsControllerAdapterFactory = (): UpdatePushSettingsControllerAdapter => {
  const updateMemberSettingsController = updateMemberSettingsControllerFactory()
  const updateSmsSettingsControllerAdapter = new UpdatePushSettingsControllerAdapter(updateMemberSettingsController)
  return updateSmsSettingsControllerAdapter
}