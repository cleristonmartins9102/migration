import { LoadMemberByPhoneNumberController } from '@/application/controller/load/load-member-by-phone-number-controller';
import { PgMemberRepository } from '@/infra/repository/pg-member-repository';

export const loadMemberByPhoneNumberControllerFactory = (): LoadMemberByPhoneNumberController => {
  const pgMemberRepository = new PgMemberRepository()
  const loadMemberByPhoneNumberController = new LoadMemberByPhoneNumberController(pgMemberRepository)
  return loadMemberByPhoneNumberController
}