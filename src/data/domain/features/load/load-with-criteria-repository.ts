import { MemberModel } from '@adamsfoodservice/core-models';
import { Contracts } from '@adamsfoodservice/shared-modules';

export interface LoadWithCriteriaRepository {
  loadWithCriteria (criteria: Contracts.Expression): Promise<MemberModel[]>
}