import { DeleteMemberWithFlexibleParams } from '@/data/features';
import { PgMemberRepository } from '@/infra/repository/pg-member-repository';

export const deleteMemberWithFlexibleParamsFactory = (): DeleteMemberWithFlexibleParams => {
  const pgMemberRepository = new PgMemberRepository()
  const deleteMember = new DeleteMemberWithFlexibleParams(pgMemberRepository)
  return deleteMember
}