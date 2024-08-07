import { RecordNotFoundError } from '@/application/errors';
import { LoadByIdRepository, UpdateMemberRepository } from '@/data/domain/features';
import { UpdateMemberSettings } from '@/data/domain/features/update/update-member-settings';

export class UpdateMemberSettingsNotification implements UpdateMemberSettings {
  constructor (private readonly pgMemberRepository: LoadByIdRepository & UpdateMemberRepository) {}
  async update(param: UpdateMemberSettings.Params): Promise<boolean> {
    const member = await this.pgMemberRepository.loadById(param.id)
    if (!member) throw new RecordNotFoundError('member', ' id', param.id)
    const { flag, type } = param.config
    const settings: any = member.settings
    if (type === UpdateMemberSettings.Types.transactional) {
      if (param.resource === UpdateMemberSettings.Resource.email) settings.transactional_email = flag
      if (param.resource === UpdateMemberSettings.Resource.push) settings.transactional_push = flag
      if (param.resource === UpdateMemberSettings.Resource.sms) settings.transactional_sms = flag
    } else {
      if (param.resource === UpdateMemberSettings.Resource.email) settings.marketing_email = flag
      if (param.resource === UpdateMemberSettings.Resource.push) settings.marketing_push = flag
      if (param.resource === UpdateMemberSettings.Resource.sms) settings.marketing_sms = flag
    }
    await this.pgMemberRepository.update({ ...member, settings })
    return true
  }
}