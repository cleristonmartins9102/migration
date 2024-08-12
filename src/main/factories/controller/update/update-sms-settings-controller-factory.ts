import { UpdateSmsSettingsControllerAdapter } from '@/application/controller/update';
import { updateMemberSettingsControllerFactory } from './update-member-settings-controller-factory';

export const updateSmsSettingsControllerAdapterFactory = (): UpdateSmsSettingsControllerAdapter => {
  const updateMemberSettingsController = updateMemberSettingsControllerFactory()
  const updateSmsSettingsControllerAdapter = new UpdateSmsSettingsControllerAdapter(updateMemberSettingsController)
  return updateSmsSettingsControllerAdapter
}