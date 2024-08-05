import { DeliveryModel } from '@adamsfoodservice/core-models'

export const makeFakeMotification = (): DeliveryModel.Modification => ({
  product_id: '1',
  image: 'http',
  name: 'any product'
})
