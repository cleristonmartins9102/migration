import { type Validation } from '@/application/contract/validation'
import { type CustomError } from '@/application/errors'

export class MinValidate implements Validation {
  constructor (readonly min: number) {}
  async validate (input: unknown): Promise<CustomError | null> {
    return null
  }
}
