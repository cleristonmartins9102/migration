import { updateMemberSettingsNotificationFactory } from '../../data/features/update/update-member-settings-use-case';
import { UpdateMemberSettingsController } from '@/application/controller/update';

export const updateMemberSettingsControllerFactory = (): UpdateMemberSettingsController => {
  const updateMemberSettingsNotification = updateMemberSettingsNotificationFactory()
  const updateMemberSettingsController = new UpdateMemberSettingsController(updateMemberSettingsNotification)
  return updateMemberSettingsController
}