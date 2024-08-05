import { CreateMemberController } from '@/application/controller';
import { PgMemberRepository } from '@/infra/repository/pg-member-repository';

export const createMemberControllerFactory = (): CreateMemberController => {
  const pgMemberRepository = new PgMemberRepository()
  const createMemberController = new CreateMemberController(pgMemberRepository)
  return createMemberController
}