import { MemberModel } from '@adamsfoodservice/core-models';

export type CreateMemberModel = Omit<MemberModel, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'>
