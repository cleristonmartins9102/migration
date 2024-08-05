import { MemberModel } from '@adamsfoodservice/core-models';

export interface LoadMemberByIdRepository {
  loadById (id: string): Promise<MemberModel | null>
}