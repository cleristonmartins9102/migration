import { UpdateMemberWithFlexibleParams } from '@/data/features/update/update-member-with-flexibile-params';
import { PgMemberRepository } from '@/infra/repository/pg-member-repository';

export const updateMemberWithFlexibleParamsFactory = (): UpdateMemberWithFlexibleParams => {
  const pgMemberRepository = new PgMemberRepository()
  const dbUpdateMember = new UpdateMemberWithFlexibleParams(pgMemberRepository)
  return dbUpdateMember
}