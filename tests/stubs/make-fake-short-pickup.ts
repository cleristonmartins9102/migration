import { DeliveryModel, OrderModel } from '@adamsfoodservice/core-models'

export const makeShortPickup = (): DeliveryModel.ShortPick => ({
  product_id: '1',
  ordered_quantity: 1,
  picked_quantity: 10,
  short_value: 29
})
