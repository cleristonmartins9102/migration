import { MemberModel } from '@adamsfoodservice/core-models';

export interface LoadAllRepository {
  loadAll(): Promise<MemberModel[]>
}