import { Validation } from '@/application/contract/validation'
import { CustomError, InvalidContentTypeError } from '@/application/errors'

export class AllowedContentTypesValidator implements Validation {
  constructor(private readonly allowedTypesName: string[]) {}

  async validate (contentType: string): Promise<CustomError | null> {
    const isAnyPresent = this.allowedTypesName.includes(contentType)
    if (!isAnyPresent) {
      return new InvalidContentTypeError(this.allowedTypesName)
    }
    return null
  }
}