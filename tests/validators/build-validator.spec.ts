import { IsStringValidator, MinValidate, RequiredParameterValidator } from '@/validator'
import { BuilderValidator } from '@/validator/build-validator'
import { EmailValidator } from '@/validator/email-validator'

describe('build validator', () => {
  it('should call required with correct value and create new validator', async () => {
    const requiredSpy = jest.spyOn(BuilderValidator.prototype, 'required')

    const sut = BuilderValidator
      .of('any_param')
      .required()
      .validateEmail()
      .isString()
      .min(8)

    expect(requiredSpy).toHaveBeenCalled()
    expect(requiredSpy).toHaveBeenCalledWith()
    expect(sut.build()).toEqual([
      new RequiredParameterValidator('any_param'),
      new EmailValidator(),
      new IsStringValidator('any_param'),
      new MinValidate(8)
    ])
  })
})
