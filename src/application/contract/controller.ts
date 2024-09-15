import { ValidatorComposite } from '@/validator'
import { badRequest, serverError } from '../helpers/http'
import { type HttpRequest, type HttpResponse } from './http'
import { type SerializeErrors, type Validation } from './validation'

export type ValidationType = Validation<unknown, ValidatorComposite.ValidateResponse>

export abstract class Controller<reqBodyType, resType> {
  abstract perform (httpRequest: HttpRequest<reqBodyType>): Promise<HttpResponse<resType>>
  async handler (httpRequest: HttpRequest<reqBodyType>): Promise<HttpResponse<resType>> {
    const validator: ValidationType & SerializeErrors = this.buildValidator()
    const error: any = await validator.validate(httpRequest.body)
    if (error) {
      console.log(httpRequest.body)
      return badRequest(validator.serializeError()) as any}
    try {
      return await this.perform(httpRequest)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return serverError(error) as HttpResponse<resType>
      } else {
        return serverError(new Error('unknow')) as HttpResponse<resType>
      }
    }
  }

  buildValidator (): ValidationType & SerializeErrors {
    return new ValidatorComposite([])
  }
}
