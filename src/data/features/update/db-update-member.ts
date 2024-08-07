import { RecordNotFoundError } from '@/application/errors';
import { UpdateMemberRepository } from '@/data/domain/features';
import { UpdateMember, UpdateMemberModel } from '@/data/domain/features/update/update-member';
import { LoadByIdRepository } from '@/data/domain/features'

export class DbUpdateMember implements UpdateMember {
  constructor (private readonly pgMemberRepository: UpdateMemberRepository & LoadByIdRepository) {}
  async update(memberData: UpdateMemberModel): Promise<boolean> {
    const member = await this.pgMemberRepository.loadById(memberData.id)
    if (!member) throw new RecordNotFoundError('Member', 'id', memberData.id)
    const notAllowedUpdatedFields = ['created_at', 'updated_at', 'internal_id']
    for (const field in memberData) {
      const updateMemberDataField = (memberData as any)[field]
      const currentMemberDataField = (member as any)[field]
      if (notAllowedUpdatedFields.includes(field) || updateMemberDataField === currentMemberDataField) continue
      (member as any)[field] = updateMemberDataField
    }
    await this.pgMemberRepository.update(member)
    return true
  }
}