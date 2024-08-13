import { MemberModel } from '@adamsfoodservice/core-models';

export interface LoadByPhoneNumberRepository {
  loadByPhoneNumber (phoneNumber: string): Promise<MemberModel | null>
}