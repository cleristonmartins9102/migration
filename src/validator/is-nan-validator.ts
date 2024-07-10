import { type CustomError, IsNotNanError } from '@/application/errors/errors'
import { type SerializeErrors, type Validation } from '@/application/contract/validation'
import { type ErrorModel } from '@/application/helpers/error-model'

interface InputType {
  [key: string]: unknown
}
export class IsNanValidator implements Validation, SerializeErrors {
  error: CustomError | null = null
  constructor (readonly paramName: string) {}

  async validate (input: InputType): Promise<CustomError | null> {
    if (isNaN((input as any)[this.paramName])) {
      this.error = new IsNotNanError(this.paramName)
    }
    return this.error
  }

  serializeError (): ErrorModel[] {
    return this.error ? [{ error: this.error?.message }] : []
  }
}
