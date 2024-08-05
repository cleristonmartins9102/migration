import { MemberModel } from '@adamsfoodservice/core-models';

export const makeFakeMemberModel = (): MemberModel => ({
  id: '1',
  user_account_id: '2',
  first_name: 'John',
  last_name: 'Seam',
  customer_type: 'Z',
  disabled: false,
  email_verified: false,
  internal_id: '2000',
  invoiced_by: '',
  payroll_number: 2000,
  role: 'customer',
  branch: {
    id: '1',
    internal_id: '444',
    name: 'Liverpool'
  },
  wallet: {
    balance: 10
  },
  location: {
    address: 'any address',
    number: '20',
    complement: 'any complement',
    postcode: 'wd24',
    city: 'Watford'
  },
  shop: {
    name: 'Shop',
    location: {
      address: 'any address',
      number: '20',
      complement: 'any complement',
      postcode: 'wd24',
      city: 'Watford'
    }
  },
  settings: {
    can_deliver: true,
    notifications: {
      email: false,
      push: false,
      sms: false
    },
    push_asked: false,
    transac_marketing_notifications: {
      marketing: {
        email: false,
        push: false,
        sms: false
      },
      transactional: {
        email: false,
        push: false,
        sms: false
      }
    },
  },
  contact: {
    phone_number: '20202',
    email: 'email@gmail.com'
  },
  web_parent: 10,
  updated_at: '' as any,
  created_at: '' as any
})