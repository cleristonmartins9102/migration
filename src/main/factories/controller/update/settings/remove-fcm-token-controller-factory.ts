
import { RemoveFcmTokenController } from '@/application/controller/update/member/remove-fcm-token-controller';
import { PgSettingsRepository } from '@/infra/repository/pg-settings-repository';

export const removeFcmTokenControllerFactory = (): RemoveFcmTokenController => {
  const pgSettingsRepository = new PgSettingsRepository()
  const removeFcmTokenController = new RemoveFcmTokenController(pgSettingsRepository)
  return removeFcmTokenController
}