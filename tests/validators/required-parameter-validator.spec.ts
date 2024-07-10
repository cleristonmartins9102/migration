import { RequiredParameterdError, type CustomError } from '@/application/errors'
import { RequiredParameterValidator } from '@/validator/required-parameter-validator'

describe('required parameter validator', () => {
  it('should returns null if no there error', async () => {
    const sut = new RequiredParameterValidator('any')

    const error = await sut.validate({ any: '10' })

    expect(error).toBeNull()
  })

  it('should returns error if validator fails', async () => {
    const sut = new RequiredParameterValidator('any')

    const error = await sut.validate({})

    expect(error).toEqual(new RequiredParameterdError('any'))
  })
})
