import { type Validation } from '@/application/contract/validation'
import { RequiredParameterdError, type CustomError } from '@/application/errors'

interface InputType {
  [key: string]: unknown
}

export class RequiredParameterValidator implements Validation {
  constructor (readonly fieldName: string) { }

  async validate (input: InputType): Promise<CustomError | null> {
    if (input[this.fieldName] === undefined) return new RequiredParameterdError(this.fieldName)
    return null
  }
}
