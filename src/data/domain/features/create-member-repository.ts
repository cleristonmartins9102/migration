import { MemberModel } from '@adamsfoodservice/core-models';
import { CreateMemberModel } from '../models';

export interface CreateMemberRepository {
  create (memberData: CreateMemberModel): Promise<MemberModel>
}