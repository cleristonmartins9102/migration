import { LoadAllMembersController } from '@/application/controller/load/load-all-members-controller';
import { PgMemberRepository } from '@/infra/repository/pg-member-repository';

export const loadAllMemberControllerFactory = (): LoadAllMembersController => {
  const pgMemberRepository = new PgMemberRepository()
  const loadAllMembersController = new LoadAllMembersController(pgMemberRepository)
  return loadAllMembersController
}