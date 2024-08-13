import { PgWalletRepository } from '@/infra/repository';
import { UpdateWalletController } from '@/application/controller/update'

export const updateWalletControllerFactory = (): UpdateWalletController => {
  const walletRepository = new PgWalletRepository()
  const updateWalletBalanceController = new UpdateWalletController(walletRepository)
  return updateWalletBalanceController
}