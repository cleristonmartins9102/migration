import memberModelToFirebaseSchema from '@/application/utils/dto'
import { makeFakeMember } from 'tests/stubs'

describe('Dto', () => {
  it('should translate models correctly', () => {
    const fakeMemeber = makeFakeMember()
    const result = memberModelToFirebaseSchema(fakeMemeber)
      expect(result.id).toBe(
      fakeMemeber.user_account_id
    )
    expect(result.email).toBe(
      fakeMemeber.contact.email
    )

    expect(result.phone_number).toBe(fakeMemeber.contact.phone_number)
    expect(result.customer_type).toBe(fakeMemeber.customer_type)
    expect(result.role).toBe(fakeMemeber.role)
    expect(result.web_parent).toBe(fakeMemeber.web_parent)
    expect(result.transac_marketing_notifications).toEqual({
      marketing: {
        sms: fakeMemeber.settings.transac_marketing_notifications.marketing.sms,
        email: fakeMemeber.settings.transac_marketing_notifications.marketing.email,
        push: fakeMemeber.settings.transac_marketing_notifications.marketing.push
      },
      transactional: {
        sms: fakeMemeber.settings.transac_marketing_notifications.transactional.sms,
        email: fakeMemeber.settings.transac_marketing_notifications.transactional.email,
        push: fakeMemeber.settings.transac_marketing_notifications.transactional.push,
      }
    })

    expect(result.branch).toEqual({
      internal_id: parseInt(fakeMemeber.branch.internal_id),
      name: fakeMemeber.branch.name,
      id: fakeMemeber.branch.id
    })

    expect(result.shop_address).toBe(fakeMemeber.location.address)
    expect(result.delivery_day_1).toBe(fakeMemeber.settings.delivery_day_1)
    expect(result.delivery_day_2).toBe(fakeMemeber.settings.delivery_day_2)
    expect(result.delivery_day_3).toBe(fakeMemeber.settings.delivery_day_3)
    expect(result.delivery_day_4).toBe(fakeMemeber.settings.delivery_day_4)
    expect(result.delivery_day_5).toBe(fakeMemeber.settings.delivery_day_5)
    expect(result.delivery_day_6).toBe(fakeMemeber.settings.delivery_day_6)
    expect(result.delivery_day_7).toBe(fakeMemeber.settings.delivery_day_7)
    expect(result.payroll_number).toBe(fakeMemeber.payroll_number ?? 0)
    expect(result.disabled).toBe(fakeMemeber.disabled)
    expect(result.invoiced_by).toBe(fakeMemeber.invoiced_by)
    expect(result.first_name).toBe(fakeMemeber.first_name)
    expect(result.last_name).toBe(fakeMemeber.last_name)
    expect(result.internal_id).toBe(fakeMemeber.internal_id)
    expect(result.town).toBe(fakeMemeber.location.city)
    expect(result.postcode).toBe(fakeMemeber.location.postcode)
    expect(result.wallet_balance).toBe(fakeMemeber.wallet.balance)
    expect(result.shop_name).toBe(fakeMemeber.shop.name)
    expect(result.push_asked).toBe(fakeMemeber.settings.push_asked)
    expect(result.notifications).toEqual({
      sms: fakeMemeber.settings.transac_marketing_notifications.transactional.sms,
      email: fakeMemeber.settings.transac_marketing_notifications.transactional.email,
      push: fakeMemeber.settings.transac_marketing_notifications.transactional.push
    })
    expect(result.email_verified).toBe(fakeMemeber.email_verified)
    expect(result.can_deliver).toBe(fakeMemeber.settings.can_deliver)
    expect(result.created_at).toEqual({
      _seconds: fakeMemeber.created_at.getTime() / 1000,
      _nanoseconds: 0
    })
    expect(result.updated_at).toEqual({
      _seconds: fakeMemeber.updated_at.getTime() / 1000,
      _nanoseconds: 0
  })
  })
})