import { RecordNotFoundError } from '@/application/errors';
import { LoadByIdRepository, LoadByInternalIdRepository } from '@/data/domain/features';
import { DeleteMember } from '@/data/domain/features/delete/delete-member';
import { DeleteMemberRepository } from '@/data/domain/features/delete/delete-member-repository';

export class DbDeleteMember implements DeleteMember {
  constructor (private readonly pgMemberRepository: LoadByIdRepository & LoadByInternalIdRepository & DeleteMemberRepository) {}
  async delete(inputData: DeleteMember.InputData): Promise<boolean> {
    let member: any
    if (inputData.id) {
      member = await this.pgMemberRepository.loadById(inputData.id)
    } else if (inputData.internal_id) {
      member = await this.pgMemberRepository.loadByInternalId(inputData.internal_id)
    }
    if (!member) throw new RecordNotFoundError('member', inputData.id ? 'id' : 'internal_id', inputData.id ?? inputData.internal_id as string)
    return await this.pgMemberRepository.delete(member.id)
  }
}