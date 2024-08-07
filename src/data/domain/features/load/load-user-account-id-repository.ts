import { MemberModel } from '@adamsfoodservice/core-models';

export interface LoadByUserAccountIdRepository {
  loadByUserAccountId (userAccountId: string): Promise<MemberModel | null>
}