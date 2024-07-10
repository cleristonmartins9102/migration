import { type CustomError, IsNotStringError, IsNotObjectError } from '@/application/errors/errors'
import { type SerializeErrors, type Validation } from '@/application/contract/validation'
import { type ErrorModel } from '@/application/helpers/error-model'

interface InputType {
  [key: string]: unknown
}
export class IsObjectValidator implements Validation, SerializeErrors {
  error: CustomError | null = null
  constructor (readonly paramName: string) {}

  async validate (input: InputType): Promise<CustomError | null> {
    if (typeof input[this.paramName] !== 'object') {
      this.error = new IsNotObjectError(this.paramName)
    }
    return this.error
  }

  serializeError (): ErrorModel[] {
    return this.error ? [{ error: this.error?.message }] : []
  }
}
