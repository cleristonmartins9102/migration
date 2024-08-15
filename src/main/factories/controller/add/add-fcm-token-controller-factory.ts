import { AddFcmTokenController } from '@/application/controller';
import { PgSettingsRepository } from '@/infra/repository/pg-settings-repository';

export const addFcmTokenControllerFactory = (): AddFcmTokenController => {
  const pgSettingsRepository = new PgSettingsRepository()
  const addFcmTokenController = new AddFcmTokenController(pgSettingsRepository)
  return addFcmTokenController
}