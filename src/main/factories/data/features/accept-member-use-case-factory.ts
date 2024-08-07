import { AcceptMember } from '@/data/domain/features';
import { AcceptMemberUseCase } from '@/data/features';
import { PgMemberRepository } from '@/infra/repository/pg-member-repository';

export const acceptMemberUseCaseFactory = (): AcceptMember => {
  const pgMemberRepository = new PgMemberRepository()
  const acceptMemberUseCase = new AcceptMemberUseCase(pgMemberRepository)
  return acceptMemberUseCase
}