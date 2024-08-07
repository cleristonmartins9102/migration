import { DeleteMember } from '@/data/domain/features/delete/delete-member';
import { DbDeleteMember } from '@/data/features/delete/db-delete-member';
import { PgMemberRepository } from '@/infra/repository/pg-member-repository';

export const dbDeleteMemberFactory = (): DeleteMember => {
  const pgMemberRepository = new PgMemberRepository()
  const dbDeleteMember = new DbDeleteMember(pgMemberRepository)
  return dbDeleteMember
}