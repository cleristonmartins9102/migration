import { formatMemberDataService } from '@/data/services/format-data-service'

describe('Format Member Data Service', () => {
  it('', async () => {
    const sut = formatMemberDataService({ first_name: 'john.', last_name: 'senna .' , contact: { phone_number: '07911 123 456' }, location: { address: 'any .', postcode: 'wd 23:', city: 'london,' } } as any)

    expect(sut).toEqual({ first_name: 'john', last_name: 'senna' , contact: { phone_number: '+447911123456' }, location: { address: 'any', postcode: 'WD 23', city: 'london' } })
  })
})