import { Controller, HttpRequest, HttpResponse, ValidationType } from '@/application/contract';
import { SerializeErrors } from '@/application/contract/validation';
import { FcmTokenAlreadyExistsError } from '@/application/errors';
import { badRequest, ok } from '@/application/helpers/http';
import { AddFcmTokenRepository } from '@/data/domain/features';
import { ValidatorComposite } from '@/validator';
import { BuilderValidator } from '@/validator/build-validator';

type InputBody = {
  fcm_token: string
}
export class AddFcmTokenController extends Controller<any, any> {
  constructor (private readonly pgSettingsRepository: AddFcmTokenRepository) { super() }
  async perform(httpRequest: HttpRequest<InputBody, unknown>): Promise<HttpResponse<any>> {
    const { body } = httpRequest
    if (!body) return badRequest('body')
    try {
      await this.pgSettingsRepository.add(body?.fcm_token)
      return ok({
        fcm_token: body.fcm_token,
        message: 'added fcm-token'
      })
    } catch (error) {
      console.log(error)
      if (error instanceof FcmTokenAlreadyExistsError) {
        return badRequest({ fcm_token: body.fcm_token, message: error.message })
      }
      throw error
    }
    
  }

  buildValidator(): ValidationType & SerializeErrors {
    return new ValidatorComposite([
      ...BuilderValidator.of('fcm_token').isString().build()
    ])
  }
}