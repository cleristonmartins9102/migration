import { DeleteMemberController } from '@/application/controller/delete/delete-member-controller';
import { deleteMemberWithFlexibleParamsFactory } from '../../data/features/delete';

export const deleteMemberControllerFactory = (): DeleteMemberController => {
  const deleteMemberWithFlexibleParams = deleteMemberWithFlexibleParamsFactory()
  const deleteMemberController = new DeleteMemberController(deleteMemberWithFlexibleParams)
  return deleteMemberController
}