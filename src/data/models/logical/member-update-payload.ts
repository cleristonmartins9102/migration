import { UpdateMember, UpdateMemberModel } from '@/data/domain/features'
import { MemberModel } from '@adamsfoodservice/core-models'


export class MemberUpdatePayload extends MemberModel {
  private updatedFields: UpdateMember.UpdateResult = {} as any

  constructor(currentMemberModel: MemberModel, updatedData: UpdateMemberModel) {
    super()
    this.id = currentMemberModel.id
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

  getUpdatedFields(): UpdateMember.UpdateResult {
    return this.updatedFields
  }

  private updateField(fieldName: keyof MemberModel, currentMemberModel: MemberModel, updatedData: UpdateMemberModel) {
    const currentValue = typeof currentMemberModel[fieldName] === 'string' ? currentMemberModel[fieldName]?.trim() : currentMemberModel[fieldName]
    const updatedValue = typeof updatedData[fieldName] === 'string' ? updatedData[fieldName]?.trim() : updatedData[fieldName]
    const hasChanged = this.hasFieldChanged(currentValue, updatedValue, fieldName)
    if (this.isObject(hasChanged)) {
      this.updatedFields = { ...this.updatedFields, ...hasChanged }
    } else {
      this.updatedFields[fieldName] = hasChanged
    }

    (this as any)[fieldName] = updatedValue ?? currentValue
  }

  private hasFieldChanged(currentValue: any, updatedValue: any, fieldName: string): any {
    if (!this.isObject(currentValue) && !this.isObject(updatedValue)) {      

      if ((!currentValue || !updatedValue)) return false
      if (currentValue !== updatedValue) {
        return true
      }
      return false
    } else {
      const objectChanged = this.deepCompareObjects(currentValue, updatedValue, fieldName)      

      return objectChanged
    }
  }

  private deepCompareObjects(obj1: any, obj2: any, fieldName: string): boolean {
    const keys1 = Object.keys(obj1)
    const changedValues: any = {}
    for (const key of keys1)  {
      if (obj1 && !obj2) {
        changedValues[fieldName] = { ...changedValues[fieldName], [key]: false }
        continue
      }

      if (!(key in obj1) || !(key in obj2)) continue
      const hValue1 = obj1[key]
      const hValue2 = obj2[key]
      if (hValue1 !== hValue2) {
        if (!changedValues[fieldName]) {
          changedValues[fieldName] = []
        }
        changedValues[fieldName] = { ...changedValues[fieldName], [key]: true }
      } else {
        changedValues[fieldName] = { ...changedValues[fieldName], [key]: false }
      }
    }
    return changedValues
  }

  private isObject(value: any): boolean {
    return value !== null && typeof value === 'object'
  }
}
