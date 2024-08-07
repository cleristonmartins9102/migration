import { type SerializeErrors, type Validation } from '@/application/contract/validation'
import { RequiredParameterdError, type CustomError } from '@/application/errors'
import { type ErrorModel } from '@/application/helpers/error-model'
import { BuilderValidator } from './build-validator'
import { RequiredParameterValidator } from './required-parameter-validator'

export class ValidatorCompositeDecorator implements Validation<any, ValidatorComposite.ValidateResponse>, SerializeErrors {
  errors: CustomError[] = []
  constructor (
    private readonly keyName: string,
    private readonly validators: Validation<any, ValidatorComposite.ValidateResponse>[]
  ) {}

  async validate (input: unknown, key?: string): Promise<ValidatorComposite.ValidateResponse> {
    const validator = new RequiredParameterValidator(this.keyName)
    const error = await validator.validate(input as  any)
    if (error) {
      return error
    }
    for (const validator of this.validators) {
      if (typeof input === 'object' && this.keyName && (input as any)[this.keyName] !== undefined) {
        if (!(input as any)[this.keyName]) {
          this.errors.push(new RequiredParameterdError(this.keyName))
        } else {
          const error = await validator.validate((input as any)[this.keyName])
          if (error) this.errors.push(error as any)
        }
      }
    }
    type ErrorType = {
      parameterName: string
    }
    return this.errors.length > 0
      ? (() => {
          const error: ErrorType = this.errors[0] as ErrorType
          error.parameterName = `${this.keyName}.${error.parameterName}`
          return error
        })()
      : null
  }

  serializeError (): ErrorModel[] {
    const formatedErrors = []
    for (const error of this.errors) {
      const formatedError = {
        parameter: error.parameterName,
        error: error.message
      }
      formatedErrors.push(formatedError)
    }

    return formatedErrors
  }
}

export namespace ValidatorComposite {
  export type ValidateResponse = unknown | null | CustomError[]
  export type SerializeErrorResponse = null | { errors: [ { message: string }] }
}
