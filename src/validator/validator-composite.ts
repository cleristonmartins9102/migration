import { type SerializeErrors, type Validation } from '@/application/contract/validation'
import { RequiredParameterdError, type CustomError } from '@/application/errors'
import { type ErrorModel } from '@/application/helpers/error-model'

export class ValidatorComposite implements Validation<any, any>, SerializeErrors {
  errors: CustomError[] = []
  constructor (private readonly validators: Validation[]) {}

  async validate (input: any, key?: string): Promise<ValidatorComposite.ValidateResponse> {
    const handledAddedRequiredValidator: any = {}
    for (const validator of this.validators) {
      const error = await validator.validate(key ? input[key] : input)
      if (error) {
        const parameterName = error.parameterName as string
        if (!!handledAddedRequiredValidator[parameterName] && handledAddedRequiredValidator[parameterName].includes('RequiredParameterError')) {
          continue
        }
        if (handledAddedRequiredValidator[parameterName] !== undefined) {
          handledAddedRequiredValidator[parameterName] = [...handledAddedRequiredValidator[parameterName], error.name]
        } else {
          handledAddedRequiredValidator[parameterName] = [error.name]
        }
        this.errors.push(error)
      }
    }
    if (this.errors.length > 0) {
      return this.errors
    }
    return null
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
