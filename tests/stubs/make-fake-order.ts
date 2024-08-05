import { MemberModel, OrderModel } from '@adamsfoodservice/core-models'
import { makeFakeMember } from './make-member-stub'

export const makeFakeOrder = (member?: MemberModel): OrderModel => ({
  id: '1',
  member: { ...makeFakeMember(), ...member },
  internal_id: '2',
  optimize_h: true,
  timeslot: {
    date: '',
    day: '1',
    from: '3',
    to: '4'
  },
  status: 'activated',
  order_id: '2',
  invoice_id: '3',
  price_including_vat: 33,
  price_excluding_vat: 3,
  vat: 1,
  due: 1,
  items: [{
    product: {} as any

  }] as any,
  picking_branch: 'pb',
  sales_branch: 'sb',
  date_of_invoice: 'di',
  time: new Date(),
  sale_type: '',
  created_at: new Date(),
  updated_at: new Date()
})
