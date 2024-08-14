import { Validation } from '@/application/contract/validation'
import { CustomError, RequiredParameterdError } from '@/application/errors'

export class RequiredAnyParameterValidator implements Validation {
  constructor(private readonly paramNames: string[]) {}

  async validate (input: any): Promise<CustomError | null> {
    const isAnyPresent = this.paramNames.some(paramName => input[paramName] !== undefined && input[paramName] !== null)
    if (!isAnyPresent) {
      return new RequiredParameterdError(`One of the following parameters is required: ${this.paramNames.join(', ')}`)
    }
    return null
  }
}