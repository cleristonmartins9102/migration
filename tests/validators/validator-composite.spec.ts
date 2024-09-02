import { Validation } from '@/application/contract/validation'
import { IsNotStringError, UserAlreadyExistsError } from '@/application/errors'
import { ValidatorComposite } from '@/validator'
import { mock, MockProxy } from 'vitest-mock-extended'

describe('Validator composite', () => {
  let validator1: MockProxy<Validation>
  let validator2: MockProxy<Validation>
  let sut: ValidatorComposite

  beforeAll(() => {
    validator1 = mock()
    validator2 = mock()
    validator1.validate.mockResolvedValue(null)
    validator2.validate.mockResolvedValue(null)
  })

  beforeEach(() => {
    sut = new ValidatorComposite([validator1, validator2])
    validator1.validate.mockClear()
    validator2.validate.mockClear()
  })

  it('should call validators', async () => {
    await sut.validate({})

    expect(validator1.validate).toHaveBeenCalled()
    expect(validator2.validate).toHaveBeenCalled()
  })

  it('should validate returns null if no error found', async () => {
    const error = await sut.validate({})

    expect(error).toBeNull()
  })

  it('should accumulating errors in the errors variable', async () => {
    const mockedError = new IsNotStringError('')
    validator1.validate.mockResolvedValueOnce(mockedError)

    await sut.validate({})

    expect(sut.errors).toEqual([mockedError])
    expect(sut.errors.length).toBe(1)
  })

  it('should validate returns a list of error if any validator fails', async () => {
    const mockedError = new IsNotStringError('')
    validator1.validate.mockResolvedValueOnce(mockedError)

    const error = await sut.validate({})

    expect(error).toEqual([mockedError])
  })

  it('should serialize error returns a list of formated errors', async () => {
    const sut = new ValidatorComposite([validator1, validator2])
    const mockedIsNotStringError = new IsNotStringError('name')
    const mockedUserExistsError = new UserAlreadyExistsError('any_email')
    validator1.validate.mockResolvedValueOnce(mockedIsNotStringError)
    validator2.validate.mockResolvedValueOnce(mockedUserExistsError)

    await sut.validate({})
    const errors = sut.serializeError()

    expect(errors).toEqual([{ parameter: 'name', error: 'the parameter is not a string' }, { parameter: 'email', error: 'the user already exists any_email' }])
  })
})
