import { AcceptMemberController } from '@/application/controller/accept/accept-member-controller'
import { acceptMemberUseCaseFactory } from '@/main/factories/data/features'

export const acceptMemberControllerFactory = (): AcceptMemberController => {
  const acceptMemberUseCase = acceptMemberUseCaseFactory()
  const acceptMemberController = new AcceptMemberController(acceptMemberUseCase)
  return acceptMemberController
}