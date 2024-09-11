import { MemberModel } from '@adamsfoodservice/core-models'
import { faker } from '@faker-js/faker'
import sm from '@adamsfoodservice/shared-modules'

export const makeFakeMember = (): MemberModel => {
  const fakeMember: any = {
    user_account_id: '100',
    first_name: faker.word.sample(),
    last_name: faker.word.sample(),
    customer_type: faker.word.sample(),
    disabled: true,
    email_verified: true,
    internal_id: faker.string.uuid(),
    invoiced_by: faker.word.sample(),
    payroll_number: faker.number.int({
      min: 1000,
      max: 99999
    }) as any,
    role: faker.word.sample(),
    branch: {
      id: 'Z',
      internal_id: faker.number.int() as any,
      name: 'company'
    },
    wallet: {
      balance: 0,
    },
    location: {
      address: faker.location.streetAddress(),
      number: faker.number.int().toString(),
      postcode: faker.location.zipCode(),
      city: faker.location.city()
    },
    settings: {
      can_deliver: true,
      delivery_day_1: false,
      delivery_day_2: false,
      delivery_day_3: false,
      delivery_day_4: false,
      delivery_day_5: false,
      delivery_day_6: false,
      delivery_day_7: false,

      push_asked: true,
      transac_marketing_notifications: {
        marketing: {
          email: true,
          push: true,
          sms: true
        },
        transactional: {
          email: true,
          push: true,
          sms: true
        }
      }
    },
    contact: {
      email: faker.internet.email(),
      phone_number: '222'
    },
    web_parent: 1,
    updated_at: new sm.DateTime.MomentAdapter(),
    created_at: new sm.DateTime.MomentAdapter(),
    shop: {
      name: 'random_shop_name'
    }
  }

  return fakeMember
}


export const MakeMemberRequest = () => {
  return {
    id: '100',
    phone_number: '+447123456789',
    email: 'a@g.com',
    branch_id: 'Z',
    shop_address: '123 street',
    town: 'town',
    postcode: 'SW1A 1AA',
    push: false,
    sms: false,
    push_marketing: false,
    sms_marketing: false,
    email_marketing: false,
    first_name: 'first',
    last_name: 'last',
    customer_type: 'customer',
    shop_name: 'random_shop_name'
  }
}
