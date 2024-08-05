import { EmailValidator } from './email-validator'
import { IsArrayValidator } from './is-array-validator'
import { IsBooleanValidator } from './is-boolean-validator'
import { IsNanValidator } from './is-nan-validator'
import { IsNumberValidator } from './is-number-validator'
import { IsObjectValidator } from './is-object-validator'
import { IsStringValidator } from './is-string-validator'
import { MinValidate } from './min-validate'
import { RequiredParameterValidator } from './required-parameter-validator'
import { Validation } from '@/application/contract/validation'

export class BuilderValidator {
  private readonly validators: Validation [] = []
  constructor (private readonly paramName: string) {}

  required (): this {
    let alreadyAddedBefore = false
    for (const validate of this.validators) {
      if (validate instanceof RequiredParameterValidator) alreadyAddedBefore = true
    }
    if (!alreadyAddedBefore) { this.validators.push(new RequiredParameterValidator(this.paramName)) }
    return this
  }

  validateEmail (): this {
    this.required()
    this.validators.push(new EmailValidator())
    return this
  }

  isString (): this {
    this.required()
    this.validators.push(new IsStringValidator(this.paramName))
    return this
  }

  isObject (): this {
    this.required()
    this.validators.push(new IsObjectValidator(this.paramName))
    return this
  }

  isNan (): this {
    this.required()
    this.validators.push(new IsNanValidator(this.paramName))
    return this
  }

  isBoolean (): this {
    this.required()
    this.validators.push(new IsBooleanValidator(this.paramName))
    return this
  }

  isNumber (): this {
    this.required()
    this.validators.push(new IsNumberValidator(this.paramName))
    return this
  }

  isArray (): this {
    this.required()
    this.validators.push(new IsArrayValidator(this.paramName))
    return this
  }

  min (min: number): this {
    this.required()
    this.validators.push(new MinValidate(min))
    return this
  }

  static of (paramName: string): BuilderValidator {
    return new BuilderValidator(paramName)
  }

  build (): Validation[] {
    return this.validators
  }
}
