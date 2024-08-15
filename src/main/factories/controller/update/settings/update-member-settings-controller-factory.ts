import { UpdateMemberSettingsController } from '@/application/controller/update';
import { updateMemberSettingsNotificationFactory } from '@/main/factories/data/features/update/update-member-settings-use-case';

export const updateMemberSettingsControllerFactory = (): UpdateMemberSettingsController => {
  const updateMemberSettingsNotification = updateMemberSettingsNotificationFactory()
  const updateMemberSettingsController = new UpdateMemberSettingsController(updateMemberSettingsNotification)
  return updateMemberSettingsController
}