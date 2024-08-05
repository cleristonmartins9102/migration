import { MemberModel } from '@adamsfoodservice/core-models'
import { faker } from '@faker-js/faker'
import sm from '@adamsfoodservice/shared-modules'

export const makeFakeMember = (): MemberModel => {
  const fakeMember: MemberModel = {
    id: faker.string.uuid(),
    user_account_id: '100',
    first_name: faker.word.sample(),
    last_name: faker.word.sample(),
    customer_type: faker.word.sample(),
    disabled: true,
    email_verified: true,
    internal_id: faker.string.uuid(),
    invoiced_by: faker.word.sample(),
    payroll_number: faker.number.int(),
    role: faker.word.sample(),
    branch: {
      id: faker.string.uuid(),
      internal_id: faker.number.int() as any,
      name: 'company'
    },
    wallet: {
      balance: 1
    },
    location: {
      address: faker.location.streetAddress(),
      number: faker.number.int().toString(),
      postcode: faker.location.zipCode(),
      city: faker.location.city()
    },
    shop: {
      name: 'company',
      location: {
        address: faker.location.streetAddress(),
        number: faker.number.int().toString(),
        postcode: faker.location.zipCode(),
        city: faker.location.city()
      }
    },
    settings: {
      can_deliver: true,
      delivery_day_1: faker.date.weekday(),
      delivery_day_2: faker.date.weekday(),
      delivery_day_3: faker.date.weekday(),
      delivery_day_4: faker.date.weekday(),
      delivery_day_5: faker.date.weekday(),
      delivery_day_6: faker.date.weekday(),
      delivery_day_7: faker.date.weekday(),
      notifications: {
        email: true,
        push: true,
        sms: true
      },
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
    web_parent: faker.number.int(),
    updated_at: new sm.DateTime.MomentAdapter(),
    created_at: new sm.DateTime.MomentAdapter()
  }

  return fakeMember
}
