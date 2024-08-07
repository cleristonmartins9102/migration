import { CreateMemberController } from '@/application/controller';
import { formatMemberDataService } from '@/data/services';
import { PgMemberRepository } from '@/infra/repository/pg-member-repository';

export const createMemberControllerFactory = (): CreateMemberController => {
  const pgMemberRepository = new PgMemberRepository()
  const createMemberController = new CreateMemberController(pgMemberRepository, formatMemberDataService)
  return createMemberController
}