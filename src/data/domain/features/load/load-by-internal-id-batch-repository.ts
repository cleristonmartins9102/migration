import { MemberModel } from '@adamsfoodservice/core-models';

export interface LoadByInternalIdBatchRepository {
  loadByInternalIdBatch (interna_id: string[]): Promise<MemberModel[]>
}