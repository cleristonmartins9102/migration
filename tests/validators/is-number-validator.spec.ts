import { IsStringValidator } from '@/validator'
import { IsNumberValidator } from '@/validator/is-number-validator'

describe('Is number validator', () => {
  it('should return an error if the value is not a number', async () => {
    const sut = new IsNumberValidator('any')

    const validatorResponse = await sut.validate({ any: '1' })

    expect(validatorResponse).not.toBeNull()
  })

  it('should return null if value provided is a number', async () => {
    const sut = new IsNumberValidator('any')

    const validatorResponse = await sut.validate({ any: 1 })

    expect(validatorResponse).toBeNull()
  })

  it('should return serialized error', async () => {
    const sut = new IsNumberValidator('any')

    await sut.validate({ any: '1' })
    const validatorResponse = sut.serializeError()

    expect(validatorResponse).toEqual([{ error: 'the parameter is not a number' }])
  })
})
