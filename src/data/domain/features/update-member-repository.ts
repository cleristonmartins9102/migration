import { UpdateMemberModel } from '@adamsfoodservice/core-models'

export interface UpdateMemberRepository {
  update (memberData: UpdateMemberModel): Promise<boolean>
}