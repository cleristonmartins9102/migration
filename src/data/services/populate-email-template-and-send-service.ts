import sm from '@adamsfoodservice/shared-modules'
import path from 'path'
import { Topics } from '@adamsfoodservice/core-models'
import { LoadByIdRepository, LoadByUserAccountIdRepository } from '../domain/features'
import { storage } from '@/application/storage/storage'
import { RecordNotFoundError } from '@/application/errors'

const templateIds = {
  changeEmail: '11',
  changeEmailNew: '25',
  changePhone: '24',
  acceptAccount: '19',
  sendMemberToSystem: '31'
}

type Params = {
  userAccountId?: string
  phoneNumber?: string
}

export type PopulateEmail = (params?: Params) => Promise<void>
export type SetupPopulateEmail = (pgMemberRepository: LoadByUserAccountIdRepository) => PopulateEmail

export const populateEmailTemplateAndSendService: SetupPopulateEmail = (pgMemberRepository): any => async (params: Params): Promise<void> => {
  const permissionPath = path.join(__dirname, '../../../credentials.json')
  const currentUser = storage.currentUser.get<any>()
  const userAccountId = params?.userAccountId ?? currentUser.id
  const member = await pgMemberRepository.loadByUserAccountId(userAccountId)
  if (!member) throw new RecordNotFoundError('member', 'user_account_id', userAccountId)
  const pubSubAdapter = (await new sm.Api.GoogleApiAdapter.Adapter(permissionPath).initialize()).createPubSubClient()
  await pubSubAdapter.publish({ topic: Topics.PopulateEmail, data: { templateId: templateIds.changePhone , data: { phone_number: member.contact.phone_number, internal_id: member.internal_id, to: '' } } })
}