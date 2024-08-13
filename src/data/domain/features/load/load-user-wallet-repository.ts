import { Wallet } from '@adamsfoodservice/core-models/dist/types/models/general';

export interface LoadUserWalletRepository {
  loadWallet (userId?: string): Promise<Wallet | null>
}