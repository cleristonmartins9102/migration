import { UpdateMember } from '@/data/domain/features/update-member';
import { DbUpdateMember } from '@/data/features/db-update-member';
import { PgMemberRepository } from '@/infra/repository/pg-member-repository';

export const dbUpdateMemberFactory = (): UpdateMember => {
  const pgMemberRepository = new PgMemberRepository()
  const dbUpdateMember = new DbUpdateMember(pgMemberRepository)
  return dbUpdateMember
}