import { UpdateMemberController } from '@/application/controller';
import { dbUpdateMemberFactory } from '../data/features/db-update-member';

export const updateMemberControllerFactory = (): UpdateMemberController => {
  const dbUpdateMember = dbUpdateMemberFactory()
  const updateMemberController = new UpdateMemberController(dbUpdateMember)
  return updateMemberController
}