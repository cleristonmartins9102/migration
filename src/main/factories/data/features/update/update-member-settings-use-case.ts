import { UpdateMember } from '@/data/domain/features/update/update-member';
import { UpdateMemberSettingsNotification } from '@/data/features/update/update-member-settings-notification';
import { PgMemberRepository } from '@/infra/repository/pg-member-repository';

export const updateMemberSettingsNotificationFactory = (): UpdateMember => {
  const pgMemberRepository = new PgMemberRepository()
  const dbUpdateMember = new UpdateMemberSettingsNotification(pgMemberRepository)
  return dbUpdateMember
}