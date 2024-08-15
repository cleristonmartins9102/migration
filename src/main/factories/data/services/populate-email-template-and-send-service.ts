import { PopulateEmail, populateEmailTemplateAndSendService } from '@/data/services';
import { PgMemberRepository } from '@/infra/repository';

export const populateEmailTemplateAndSendServiceFactory = (): PopulateEmail => {
  const pgMemberRepository = new PgMemberRepository()
  const populateEmailTemplateAndSend = populateEmailTemplateAndSendService(pgMemberRepository)
  return populateEmailTemplateAndSend
}