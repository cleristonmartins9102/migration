import sm, { Utils } from '@adamsfoodservice/shared-modules'
import { MemberModel, OldMemberModel } from '@adamsfoodservice/core-models'
import { PgAuditRepository } from '@/infra/repository/pg-audit-repository'
import { createMemberControllerFactory } from '@/main/factories/controller'
import { PgMemberRepository } from '@/infra/repository'

export namespace PubAdapter {
  export namespace Publisher {
    export const messageOnCreatedDqsTopic = async (data: {[key: string]: any}) => {
      const read = new sm.File.ReadFileAdapter()
      const permission = await read.read(Utils.PermissionPath.loadPermissionPath() ?? '').toJson() as any
      const { client_email, private_key } = permission
      const credentials = {
        credentials: {
          client_email,
            private_key
        },
        projectId: ''
      }
      const pub = new sm.Broker.PubSubAdapter(credentials)
      return await pub.publish({ author: 'W', topic: 'migration_task_created_member_dqe', data })
    }
  }
  export namespace Subscriber {
    const axiosAdapter = new sm.Api.Http.AxiosAdapter()
    const pgMemberRepository = new PgMemberRepository()
    export const messageOnCreatedTopic = async () => {
      const pub = (await (new sm.Api.GoogleApiAdapter.Adapter(Utils.PermissionPath.loadPermissionPath() ?? '')).initialize()).createPubSubClient()
      const pgAuditRepository = new PgAuditRepository()
      const createMember = async (model: Omit<MemberModel, 'created_at' | 'updated_at' | 'created_by' | 'updated_by'>, messageJson: { [key: string]: any }, type = 'parent'): Promise<any> => {
        const createMemberController = createMemberControllerFactory()
        let response: any = {}
        if (type === 'children') {
          const parent = await pgAuditRepository.loadByWebParent(model.web_parent as any)
          if (parent) {
            model.web_parent = parent.target_record_id as any
          } else {
            await pgAuditRepository.create({ source_record_id: messageJson.id, target_record_id: null, operation_type: 'CREATE', operation_details: messageJson, source_table_name: 'users', error_message: `no parent found ${model.web_parent}`, performed_by: 'agent', status: 'failed' })
            throw new Error(`No parent found with id ${model.id}`)
          }
        }
        response = await createMemberController.handler({ body: model })
        if (response.statusCode !== 201) {
          const message = (response as any).body.error as any
          await pgAuditRepository.create({ source_record_id: messageJson.id, target_record_id: null, operation_type: 'CREATE', operation_details: messageJson, source_table_name: 'users', error_message: message, performed_by: 'agent', status: 'failed' })
          console.log(message ?? (response as any).body)
          throw Error(message)
        } else {
          await pgAuditRepository.create({ source_record_id: messageJson.id, target_record_id: null, operation_type: 'CREATE', operation_details: messageJson, source_table_name: 'users', error_message: '', performed_by: 'agent', status: 'succeds' })
        }
        console.log(`Created: ${response.body.id}`)
      }
      const listCheck: any = []
      return await pub.subscribe({
        subscriberName: 'agent-created-member', delayRetry: 5000, topicName: 'migration_task_created_member', callback: async (message: { data: string }) => {
          const messageJson = JSON.parse(message.data.toString()) as OldMemberModel
          try {
            const model: Omit<MemberModel, 'created_at' | 'updated_at' | 'created_by' | 'updated_by'> = {
              'id': messageJson.id,
              'first_name': messageJson.first_name,
              'last_name': messageJson.last_name,
              'customer_type': messageJson.customer_type,
              'branch_id': messageJson.branch.id,
              'shop_address': messageJson.shop_address,
              'shop_name': messageJson.shop_name,
              'postcode': messageJson.postcode,
              internal_id: messageJson.internal_id,
              'push': messageJson.transac_marketing_notifications.marketing.push,
              'sms': messageJson.transac_marketing_notifications.marketing.sms,
              'email': messageJson.email ?? 'not provided',
              'push_marketing': messageJson.transac_marketing_notifications.marketing.push,
              'email_marketing': messageJson.transac_marketing_notifications.marketing.email,
              'sms_marketing': messageJson.transac_marketing_notifications.marketing.sms,
              'town': messageJson.town,
              'phone_number': messageJson.phone_number ?? 'not provided'
            } as any
            if (model.web_parent && model.web_parent !== 0) {
              try {
                await createMember(model, messageJson, 'children')
              } catch (error) {
                console.log(error)
                throw error
              }
            } else {
              try {
                await createMember(model, messageJson)
              } catch (error) {
                console.log(error)
                throw error
              }
            }
          } catch (error) {
            if (error instanceof Error) {
              if (error.message.includes('Cannot read properties of undefined')) {
                try {
                  await PubAdapter.Publisher.messageOnCreatedDqsTopic(messageJson)
                } catch (error) {
                  console.log('ERROR DQE')
                }
                console.log('Message lettered')
              } else {
                try {
                  await pgAuditRepository.create({ source_record_id: messageJson.id, target_record_id: null, operation_type: 'CREATE', operation_details: messageJson, source_table_name: 'users', error_message: error?.message ?? '', performed_by: 'agent', status: 'faild' })
                } catch (error) {
                  await pgMemberRepository.deleteByUserAccountId(messageJson.id)
                  throw error
                } 
                console.log(error.message)
                await pgMemberRepository.deleteByUserAccountId(messageJson.id)
                throw error
              }
            }
          }
        }
      })
    }

    export const messageOnUpdatedTopic = async () => {
      const pub = (await (new sm.Api.GoogleApiAdapter.Adapter(Utils.PermissionPath.loadPermissionPath() ?? '')).initialize()).createPubSubClient()
      await pub.subscribe({
        subscriberName: 'agent-updated-member', delayRetry: 5000, topicName: 'migration_task_updated_member', callback: async (message: any) => {
          try {
            const messageJson = JSON.parse(message.data.toString())
            const model: Omit<MemberModel, 'created_at' | 'updated_at' | 'created_by' | 'updated_by'> = {
              'id': messageJson.id,
              'first_name': messageJson.first_name,
              'last_name': messageJson.last_name,
              'customer_type': messageJson.customer_type,
              'branch_id': messageJson.branch.id,
              'shop_address': messageJson.shop_address,
              'shop_name': messageJson.shop_name,
              'postcode': messageJson.postcode,
              internal_id: messageJson.internal_id,
              'push': messageJson.transac_marketing_notifications.marketing.push,
              'sms': messageJson.transac_marketing_notifications.marketing.sms,
              'email': messageJson.email,
              'push_marketing': messageJson.transac_marketing_notifications.marketing.push,
              'email_marketing': messageJson.transac_marketing_notifications.marketing.email,
              'sms_marketing': messageJson.transac_marketing_notifications.marketing.sms,
              'town': messageJson.town,
              'phone_number': messageJson.phone_number
            } as any
            // const httpResponse = await axiosAdapter.request({ method: 'POST' as any, url: 'http://127.0.0.1:5050/api/member/v1/update', data: model }, { Authorization: `Bearer ${token}` })
            // if (httpResponse.statusCode !== 200) {
            //   const message = (httpResponse as any).body.message as any
            //   throw Error(message)
            // }
          } catch (error) {
            console.log(error)
            throw error
          }
        }
      })
    }

    export const messageOnRemovedTopic = async () => {
      const pub = (await (new sm.Api.GoogleApiAdapter.Adapter(Utils.PermissionPath.loadPermissionPath() ?? '')).initialize()).createPubSubClient()
      return await pub.subscribe({
        subscriberName: 'agent-removed-member', topicName: 'migration_task_removed_member', callback: (message: any) => {
          console.log(message.data.toString())
        }
      })
    }
  }
}