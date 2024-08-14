import { UpdateMemberController } from '@/application/controller/update/member/update-member-controller';
import { updateMemberWithFlexibleParamsFactory } from '../data/features/update/update-member-with-flexible-params';

export const updateMemberControllerFactory = (): UpdateMemberController => {
  const dbUpdateMember = updateMemberWithFlexibleParamsFactory()
  const updateMemberController = new UpdateMemberController(dbUpdateMember)
  return updateMemberController
}