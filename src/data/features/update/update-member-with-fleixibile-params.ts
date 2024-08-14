import { RecordNotFoundError } from '@/application/errors'
import { LoadByIdRepository, LoadByInternalIdRepository, UpdateMemberModel, UpdateMemberRepository } from '@/data/domain/features'
import { MemberUpdatePayload } from '@/data/models/logical'
import { MemberModel } from '@adamsfoodservice/core-models'

export class UpdateMemberWithFlexibleParams {
  constructor(private readonly pgMemberRepository: LoadByIdRepository & LoadByInternalIdRepository & UpdateMemberRepository) { }
  async update(updateMemberData: UpdateMemberModel): Promise<boolean> {
    let member: any
    let paramName = ''
    let paramValue = ''
    if (updateMemberData.id) {
      member = await this.pgMemberRepository.loadById(updateMemberData.id)
      paramName = 'id'
      paramValue = updateMemberData.id
    } else if (updateMemberData.internal_id) {
      member = await this.pgMemberRepository.loadByInternalId(updateMemberData.internal_id)
      paramName = 'internal_id'
      paramValue = updateMemberData.internal_id
    }
    if (!member) {
      throw new RecordNotFoundError('member', paramName, paramValue)
    }
    await this.pgMemberRepository.update(new MemberUpdatePayload(member, updateMemberData))
    return true
  }
}

export namespace UpdateMemberWithFlexibleParams {
  export type Params = {
    internal_id?: string
    id?: string
    accounts?: string
  }
}