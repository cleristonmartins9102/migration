import { UpdateMemberController } from '@/application/controller/update/update-member-controller';
import { dbUpdateMemberFactory } from '../data/features/update/db-update-member';

export const updateMemberControllerFactory = (): UpdateMemberController => {
  const dbUpdateMember = dbUpdateMemberFactory()
  const updateMemberController = new UpdateMemberController(dbUpdateMember)
  return updateMemberController
}