import { MemberModel } from '@adamsfoodservice/core-models'

export type UpdateMemberModel = {
  [Property in keyof MemberModel]?: MemberModel[Property];
} & {
  id: string
}

export interface UpdateMember {
  update (memberData: UpdateMemberModel): Promise<boolean>
}