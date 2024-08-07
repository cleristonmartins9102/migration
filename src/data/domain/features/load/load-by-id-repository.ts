import { MemberModel } from '@adamsfoodservice/core-models';

export interface LoadByIdRepository {
  loadById (id: string): Promise<MemberModel | null>
}