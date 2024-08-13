import { LoadUserWalletController } from '@/application/controller/load/load-user-wallet-controller';
import { PgMemberRepository } from '@/infra/repository/pg-member-repository';

export const loadUserWalletControllerFactory = (): LoadUserWalletController => {
  const pgMemberRepository = new PgMemberRepository()
  const loadUserWalletController = new LoadUserWalletController(pgMemberRepository)
  return loadUserWalletController
}