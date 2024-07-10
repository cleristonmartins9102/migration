import { IsStringValidator } from '@/validator'

describe('Is string validator', () => {
  it('should return an error if the value is not a string', async () => {
    const sut = new IsStringValidator('any')

    const validatorResponse = await sut.validate({ any: 1 })

    expect(validatorResponse).not.toBeNull()
  })

  it('should return null if value provided is a string', async () => {
    const sut = new IsStringValidator('any')

    const validatorResponse = await sut.validate({ any: 'any_string' })

    expect(validatorResponse).toBeNull()
  })

  it('should return serialized error', async () => {
    const sut = new IsStringValidator('any')

    await sut.validate({ any: 1 })
    const validatorResponse = sut.serializeError()

    expect(validatorResponse).toEqual([{ error: 'the parameter is not a string' }])
  })
})
