import { RejectMemberController } from '@/application/controller/reject/reject-member-controller'
import { PgMemberRepository } from '@/infra/repository'

export const rejectMemberControllerFactory = (): RejectMemberController => {
  const pgMemberRepository = new PgMemberRepository()
  const rejectMemberController = new RejectMemberController(pgMemberRepository)
  return rejectMemberController
}