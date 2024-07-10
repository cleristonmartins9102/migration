import { IsStringValidator } from '@/validator'
import { IsBooleanValidator } from '@/validator/is-boolean-validator'

describe('Is boolean validator', () => {
  it('should return an error if the value is not a boolean', async () => {
    const sut = new IsBooleanValidator('any')

    const validatorResponse = await sut.validate({ any: '1' })

    expect(validatorResponse).not.toBeNull()
  })

  it('should return null if value provided is a boolean', async () => {
    const sut = new IsBooleanValidator('any')

    const validatorResponse = await sut.validate({ any: true })

    expect(validatorResponse).toBeNull()
  })

  it('should return serialized error', async () => {
    const sut = new IsBooleanValidator('any')

    await sut.validate({ any: '1' })
    const validatorResponse = sut.serializeError()

    expect(validatorResponse).toEqual([{ error: 'the parameter is not a boolean' }])
  })
})
