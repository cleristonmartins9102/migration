import { UpdateWalletBalanceFromErpDataController } from '@/application/controller/update/wallet/update-wallet-balance-from-erp-data-controller';
import { updateWalletControllerFactory } from './update-wallet-balance-controller-factory';

export const updateWalletBalanceFromErpDataControllerFactory = (): UpdateWalletBalanceFromErpDataController => {
  const updateWalletBalanceControllerFactory = updateWalletControllerFactory()
  const updateWalletBalanceFromErpDataController = new UpdateWalletBalanceFromErpDataController(updateWalletBalanceControllerFactory)
  return updateWalletBalanceFromErpDataController
}