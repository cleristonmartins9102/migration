import { ActivatePushAskedSettingsControllerAdapter } from '@/application/controller/update';
import { updateMemberSettingsControllerFactory } from './update-member-settings-controller-factory';

export const activatePushAskedSettingsControllerAdapterFactory = (): ActivatePushAskedSettingsControllerAdapter => {
  const updateMemberSettingsController = updateMemberSettingsControllerFactory()
  const activatePushAskedSettingsControllerAdapter = new ActivatePushAskedSettingsControllerAdapter(updateMemberSettingsController)
  return activatePushAskedSettingsControllerAdapter
}