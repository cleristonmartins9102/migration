import { UpdateMemberModel } from '@/data/domain/features'
import { MemberModel } from '@adamsfoodservice/core-models'

export class MemberUpdatePayload extends MemberModel{
  constructor(currentMemberModel: MemberModel, updatedData: UpdateMemberModel) {
    super()
    this.updateField('id', currentMemberModel, updatedData)
    this.updateField('first_name', currentMemberModel, updatedData)
    this.updateField('last_name', currentMemberModel, updatedData)
    this.updateField('customer_type', currentMemberModel, updatedData)
    this.updateField('disabled', currentMemberModel, updatedData)
    this.updateField('email_verified', currentMemberModel, updatedData)
    this.updateField('internal_id', currentMemberModel, updatedData)
    this.updateField('invoiced_by', currentMemberModel, updatedData)
    this.updateField('payroll_number', currentMemberModel, updatedData)
    this.updateField('role', currentMemberModel, updatedData)
    this.updateField('branch', currentMemberModel, updatedData)
    this.updateField('wallet', currentMemberModel, updatedData)
    this.updateField('location', currentMemberModel, updatedData)
    this.updateField('settings', currentMemberModel, updatedData)
    this.updateField('contact', currentMemberModel, updatedData)
    this.updateField('web_parent', currentMemberModel, updatedData)
  }
  private updateField(fieldName: keyof MemberModel, currentMemberModel: MemberModel, updatedData: UpdateMemberModel) {
    (this as any)[fieldName] = updatedData[fieldName] ?? currentMemberModel[fieldName]
  }
}