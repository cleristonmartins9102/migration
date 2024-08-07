import { MemberModel } from '@adamsfoodservice/core-models'
import { Utils } from '@adamsfoodservice/shared-modules'
import { CreateMemberModel } from '../domain/models'

export type FormatMemberData = (memberData: CreateMemberModel) => CreateMemberModel
export const formatMemberDataService: FormatMemberData = (memberData) => {
  memberData.first_name = Utils.removePontuaction(memberData.first_name).trim()
  memberData.last_name = Utils.removePontuaction(memberData.last_name).trim()
  if (memberData.location) {
    const address = Utils.removeNoAphanumericOrSpace(memberData.location.address).trim()
    const postcode = Utils.removeNoAphanumericOrSpace(memberData.location.postcode).toUpperCase().trim()
    const city = Utils.removeNoAphanumericOrSpace(memberData.location.city).trim()
    memberData.location = { ...memberData.location, postcode, city, address }
  }
  const phoneNumber = Utils.normalizeUKPhoneNumber(memberData.contact.phone_number).trim()
  memberData.contact = { ...memberData.contact, phone_number: phoneNumber }
  return memberData
}