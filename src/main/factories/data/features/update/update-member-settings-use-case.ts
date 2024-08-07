import { UpdateMemberSettings } from '@/data/domain/features/update/update-member-settings';
import { UpdateMemberSettingsNotification } from '@/data/features/update/update-member-settings-notification';
import { PgMemberRepository } from '@/infra/repository/pg-member-repository';

export const updateMemberSettingsNotificationFactory = (): UpdateMemberSettings => {
  const pgMemberRepository = new PgMemberRepository()
  const dbUpdateMember = new UpdateMemberSettingsNotification(pgMemberRepository)
  return dbUpdateMember
}