import { Criteria } from '@/data/domain/features/load/filter/criteria'
import { Expression } from '@/data/domain/features/load/filter/expression'
import { Filter } from '@/data/domain/features/load/filter/filter'

describe('Criteria', () => {
  it('', () => {
    const filter = new Filter('name', '=', 1)
    const filter2 = new Filter('surname', '=', 3)
    const criteria = new Criteria()


    const filter3 = new Filter('lote', '=', 1)
    const filter4 = new Filter('branch', '=', 3)
    const criteria1 = new Criteria()
    criteria1.add(filter3)
    criteria1.add(filter4)
    criteria.add(criteria1)
    console.log(criteria.dump())
  })
})