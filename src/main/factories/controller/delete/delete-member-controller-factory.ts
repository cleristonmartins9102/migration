import { DeleteMemberController } from '@/application/controller/delete/delete-member-controller';
import { dbDeleteMemberFactory } from '../../data/features/delete/db-delete-member-factory'

export const deleteMemberControllerFactory = (): DeleteMemberController => {
  const dbDeleteMember = dbDeleteMemberFactory()
  const deleteMemberController = new DeleteMemberController(dbDeleteMember)
  return deleteMemberController
}