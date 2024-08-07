export interface DeleteMemberRepository {
  delete (inputData: string): Promise<boolean>
}