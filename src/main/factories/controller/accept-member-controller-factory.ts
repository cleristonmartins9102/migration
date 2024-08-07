import { AcceptMemberController } from '@/application/controller/accept-member-controller';
import { acceptMemberUseCaseFactory } from '../data/features';

export const acceptMemberControllerFactory = (): AcceptMemberController => {
  const acceptMemberUseCase = acceptMemberUseCaseFactory()
  const acceptMemberController = new AcceptMemberController(acceptMemberUseCase)
  return acceptMemberController
}