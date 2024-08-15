import { LoadByInternalIdBatchController } from '@/application/controller/load/load-by-internal-id-batch-controller';
import { PgMemberRepository } from '@/infra/repository/pg-member-repository';

export const loadMembersByInternalIdBatchControllerFactory = (): LoadByInternalIdBatchController => {
  const pgMemberRepository = new PgMemberRepository()
  const loadByInternalIdBatchController = new LoadByInternalIdBatchController(pgMemberRepository)
  return loadByInternalIdBatchController
}