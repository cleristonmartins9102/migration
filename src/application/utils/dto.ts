import { MemberModel, OldMemberModel } from '@adamsfoodservice/core-models';

export default function memberModelToFirebaseSchema (memberModel: MemberModel) : OldMemberModel {
  return {
    id: memberModel.user_account_id,
    email: memberModel.contact.email,
    phone_number: memberModel.contact.phone_number,
    customer_type: memberModel.customer_type,
    role: memberModel.role,
    web_parent: memberModel.web_parent,
    transac_marketing_notifications: {
      marketing: {
        sms: memberModel.settings.transac_marketing_notifications.marketing.sms,
        email: memberModel.settings.transac_marketing_notifications.marketing.email,
        push: memberModel.settings.transac_marketing_notifications.marketing.push
      },
      transactional: {
        sms: memberModel.settings.transac_marketing_notifications.transactional.sms,
        email: memberModel.settings.transac_marketing_notifications.transactional.email,
        push: memberModel.settings.transac_marketing_notifications.transactional.push
      }
    },
    branch: {
      internal_id: parseInt(memberModel.branch.internal_id),
      name: memberModel.branch.name,
      id: memberModel.branch.id
    },
    shop_address: memberModel.location.address,
    delivery_day_1: memberModel.settings.delivery_day_1,
    delivery_day_2: memberModel.settings.delivery_day_2,
    delivery_day_3: memberModel.settings.delivery_day_3,
    delivery_day_4: memberModel.settings.delivery_day_4,
    delivery_day_5: memberModel.settings.delivery_day_5,
    delivery_day_6: memberModel.settings.delivery_day_6,
    delivery_day_7: memberModel.settings.delivery_day_7,
    payroll_number: memberModel.payroll_number ?? 0,
    disabled: memberModel.disabled,
    invoiced_by: memberModel.invoiced_by,
    first_name: memberModel.first_name,
    last_name: memberModel.last_name,
    internal_id: memberModel.internal_id,
    town: memberModel.location.city,
    postcode: memberModel.location.postcode,
    wallet_balance: memberModel.wallet.balance,
    shop_name: memberModel.shop.name,
    push_asked: memberModel.settings.push_asked,
    notifications: {
      sms: memberModel.settings.transac_marketing_notifications.transactional.sms,
      email: memberModel.settings.transac_marketing_notifications.transactional.email,
      push: memberModel.settings.transac_marketing_notifications.transactional.push
    },
    email_verified: memberModel.email_verified,
    can_deliver: memberModel.settings.can_deliver,
    created_at: {
      _seconds: memberModel.created_at.getTime() / 1000,
      _nanoseconds: 0
    },
    updated_at: {
      _seconds: memberModel.updated_at.getTime() / 1000,
      _nanoseconds: 0
    }
  }
}