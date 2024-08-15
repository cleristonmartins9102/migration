import { MemberModel } from '@adamsfoodservice/core-models';

export interface LoadByEmailRepository {
  loadByEmail (email: string): Promise<MemberModel | null>
}