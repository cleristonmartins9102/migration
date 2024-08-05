import { DeliveryModel } from '@adamsfoodservice/core-models'
import { makeFakeOrder } from './make-fake-order'
import sm from '@adamsfoodservice/shared-modules'

export const makeDeliveryModelStub = (): DeliveryModel => ({
  id: '1',
  order_id: '2',
  created_at: new sm.DateTime.MomentAdapter(),
  updated_at: new sm.DateTime.MomentAdapter(),
  created_by: '',
  updated_by: '',
  order: makeFakeOrder(),
  vat_analysis: [{
    rate: 2,
    type: 'Z',
    value: 2,
    vat: 10
  }],
  motification: {
    product_id: '2',
    image: 'http://any.com',
    name: 'product2'
  },
  short_pick: {
    product_id: '1',
    ordered_quantity: 10,
    picked_quantity: 2,
    short_value: 1
  },
  status: DeliveryModel.Status.Accepted,
  deliveryDate: '2024',
  total: 10,
  value: 2,
  vat: 2,
  special_price: 44,
  placed_by_system: true
})
