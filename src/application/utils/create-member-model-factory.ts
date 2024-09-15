import { CreateMemberModel, CreateMemberShop } from '@/data/domain/models'
import { CreateMemberController } from '../controller/create'

export class CreateMemberModelFactory {
  static factory(body: CreateMemberController.Input): any {
    const buildInternalId = (): string => !body?.internal_id || ['', 0, '0'].includes(body.internal_id) ? `${Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}-pending` : body.internal_id
    switch (body.customer_type) {
      case 'Z05': { 
        return  {
          shop: {
            name: body.shop_name
          },
          wallet: { balance: 0 },
          user_account_id: body.id,
          first_name: body?.first_name,
          last_name: body?.last_name,
          customer_type: body?.customer_type,
          disabled: true,
          email_verified: true,
          internal_id: buildInternalId(),
          invoiced_by: '',
          payroll_number: 1,
          role: '',
          branch: {
            id: body.branch_id,
            internal_id: '',
            name: body.branch_id
          },
          location: {
            address: body.shop_address,
            postcode: body.postcode,
            city: body.town,
            number: ''
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
                email: body.push_marketing,
                push: body.sms_marketing,
                sms: body.sms_marketing
              },
              transactional: {
                email: !!body.email,
                push: body.push,
                sms: body.sms
              }
            },
          },
          contact: {
            phone_number: body.phone_number,
            email: body.email
          },
          web_parent: body?.web_parent ?? null
        }
      }

      default: {
        return new CreateMemberShop({
          wallet: { balance: 0 },
          user_account_id: body.id,
          first_name: body?.first_name,
          last_name: body?.last_name,
          customer_type: body?.customer_type,
          disabled: true,
          email_verified: true,
          internal_id: buildInternalId(),
          invoiced_by: '',
          role: '',
          branch: {
            id: body.branch_id,
            internal_id: '',
            name: body.branch_id
          },
          location: {
            address: body.shop_address,
            postcode: body.postcode,
            city: body.town,
            number: ''
          },
          shop: {
            name: body.shop_name
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
                email: body.push_marketing,
                push: body.sms_marketing,
                sms: body.sms_marketing
              },
              transactional: {
                email: true,
                push: body.push,
                sms: body.sms
              }
            },
          },
          contact: {
            phone_number: body.phone_number,
            email: body.email
          },
          web_parent: body?.web_parent ?? null
        } as any)
        
      }
    }
  }
}