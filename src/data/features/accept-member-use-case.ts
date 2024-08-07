import { RecordNotFoundError } from '@/application/errors';
import { AcceptMember, LoadByIdRepository, UpdateMemberRepository } from '../domain/features';

export class AcceptMemberUseCase implements AcceptMember {
  constructor (private readonly pgMemberRepository: LoadByIdRepository & UpdateMemberRepository) {}
  async accept(memberId: string, internalId: string): Promise<boolean> {
    const member = await this.pgMemberRepository.loadById(memberId)
    if (!member) throw new RecordNotFoundError('member', 'id', memberId)
    await this.pgMemberRepository.update({ ...member, disabled: false, internal_id: internalId })
    return true
  }
}