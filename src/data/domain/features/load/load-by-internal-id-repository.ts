import { MemberModel } from '@adamsfoodservice/core-models';

export interface LoadByInternalIdRepository {
  loadByInternalId (interna_id: string): Promise<MemberModel | null>
}