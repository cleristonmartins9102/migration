import { type Validation } from '@/application/contract/validation'
import { type CustomError } from '@/application/errors'

export class EmailValidator implements Validation {
  async validate (input: unknown): Promise<CustomError | null> {
    return null
  }
}
