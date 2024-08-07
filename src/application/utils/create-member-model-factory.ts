import { CreateMemberController } from '../controller/create-member-controller';
import { CreateMemberHouseHold, CreateMemberModel, CreateMemberShop } from '@/data/domain/models'

export class CreateMemberModelFactory {
  static factory(body: CreateMemberController.Input): CreateMemberModel {
    switch (body.customer_type) {
      case 'Z05': { 
        return new CreateMemberHouseHold({
          wallet: { balance: 0 },
          user_account_id: body.id,
          first_name: body?.first_name,
          last_name: body?.last_name,
          customer_type: body?.customer_type,
          disabled: true,
          email_verified: true,
          internal_id: '0',
          invoiced_by: '',
          payroll_number: 1,
          role: '',
          branch: {
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
          web_parent: 1
        })
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
          internal_id: '0',
          invoiced_by: '',
          role: '',
          branch: {
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
          web_parent: 1
        })
        
      }
    }
  }
}