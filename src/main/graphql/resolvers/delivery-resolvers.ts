import { storage } from '@/application/storage/storage'
import { loadUserDeliveriesControllerFactory } from '@/main/factories/controller'
import { DeliveryModel } from '@adamsfoodservice/core-models'
import { Middleware } from '@adamsfoodservice/shared-middleware'
import sm from '@adamsfoodservice/shared-modules'
import path from 'path'

type Input = {
  dateRange?: {
    startDate: string
    finishDate: string
  }
  status?: string
}
export const deliveryResolver = {
  Query: {
    loadUserDeliveries: async (_: any, httpRequest: Input, context: any): Promise<any> => {
      const allDeliveries = new Promise((resolve, reject) => {
        const permissionPath = path.join(__dirname, '../../../../permissions.json')
        Middleware.graphqlAuth(permissionPath, storage.currentUser)(context, async () => {
          const controller = loadUserDeliveriesControllerFactory()
          const deliveries = await controller.perform(httpRequest as any)
          const { body } = deliveries as any
          const { dateRange, status } = httpRequest
          let response: any = []
          if (dateRange && Array.isArray(body)) {
            const deliveryDateRange = body.filter(delivery => {
              return delivery.created_at.isBeteween(dateRange.startDate, dateRange?.finishDate)
            })
            response = [...response, ...deliveryDateRange]
          }

          if (status) {
            const deliveryByStatus = body.filter((delivery: DeliveryModel) => {
              return delivery.status === status
            })
            response = [...response, ...deliveryByStatus]
          }
          const uniqueDeliveries = Object.values(
            response.reduce((acc: any, current: any) => {
              acc[current.id] = current
              return acc
            }, {})
          )

          resolve((dateRange || status ? uniqueDeliveries : body).map((delivery: any) => ({ ...delivery, created_at: delivery.created_at.format('YYYY-MM-DD HH:mm:ss'), updated_at: delivery.updated_at.format('YYYY-MM-DD HH:mm:ss') })))
        }).catch((err: any) => reject(err))
      })
      return await allDeliveries
    }
  }
}
