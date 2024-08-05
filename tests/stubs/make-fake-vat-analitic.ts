import { DeliveryModel } from '@adamsfoodservice/core-models'

export const makeVatAnalysis = (): DeliveryModel.VatAnalysis => ({
  rate: 1,
  type: 'Z',
  value: 1,
  vat: 3
})
