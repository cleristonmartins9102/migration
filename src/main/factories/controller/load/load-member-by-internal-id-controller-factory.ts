import { LoadMemberByInternalIdController } from '@/application/controller/load';
import { PgMemberRepository } from '@/infra/repository/pg-member-repository';

export const loadMemberByInternalIdControllerFactory = (): LoadMemberByInternalIdController => {
  const pgMemberRepository = new PgMemberRepository()
  const loadMemberByInternalIdController = new LoadMemberByInternalIdController(pgMemberRepository)
  return loadMemberByInternalIdController
}