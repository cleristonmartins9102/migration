import { type Validation } from '@/application/contract/validation'
import { WrongProvidedEmailError, type CustomError } from '@/application/errors'
import emailvalidator from 'email-validator'
export class EmailValidator implements Validation {
  async validate (input: unknown): Promise<CustomError | null> {
    const email = (input as any).email
    return emailvalidator.validate(email) === true ? null : new WrongProvidedEmailError(email)
  }
}
