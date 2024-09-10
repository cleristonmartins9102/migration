import { Branch, MemberModel, MemberShip } from '@adamsfoodservice/core-models'
import { Contact, Location, Shop, Wallet } from '@adamsfoodservice/core-models/dist/types/models/general'

export type CreateMemberModel = Omit<MemberModel, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'>

export class CreateMemberShop {
  user_account_id: string
  first_name: string
  last_name: string
  customer_type: string
  disabled: boolean
  email_verified: boolean
  internal_id: string
  invoiced_by: string
  role: string
  branch: Branch
  shop: Shop
  wallet: Wallet
  location: Location
  settings: MemberShip.MemberShipSettings
  contact: Contact
  web_parent: number
  payroll_number: number

  constructor(data: CreateMemberModel) {
    this.user_account_id = data.user_account_id
    this.first_name = data.first_name
    this.last_name = data.last_name
    this.customer_type = data.customer_type
    this.disabled = data.disabled
    this.email_verified = data.email_verified
    this.internal_id = data.internal_id
    this.invoiced_by = data.invoiced_by
    this.role = data.role
    this.branch = data.branch
    this.shop = data.shop
    this.wallet = data.wallet
    this.location = data.location
    this.settings = data.settings
    this.contact = data.contact
    this.web_parent = data.web_parent
    this.payroll_number = data.payroll_number || 0
  }
}
