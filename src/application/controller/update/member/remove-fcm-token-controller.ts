import { Controller, HttpRequest, HttpResponse, ValidationType } from '@/application/contract';
import { SerializeErrors } from '@/application/contract/validation';
import { FcmTokenAlreadyExistsError } from '@/application/errors';
import { badRequest, ok } from '@/application/helpers/http';
import { AddFcmTokenRepository, RemoveFcmTokenRepository } from '@/data/domain/features';
import { ValidatorComposite } from '@/validator';
import { BuilderValidator } from '@/validator/build-validator';

type InputBody = {
  fcm_token: string
}
export class RemoveFcmTokenController extends Controller<any, any> {
  constructor (private readonly pgSettingsRepository: RemoveFcmTokenRepository) { super() }
  async perform(httpRequest: HttpRequest<InputBody, unknown>): Promise<HttpResponse<any>> {
    const { body } = httpRequest
    if (!body) return badRequest('body')
    try {
      await this.pgSettingsRepository.remove(body?.fcm_token)
      return ok({
        fcm_token: body.fcm_token,
        message: 'removed fcm-token'
      })
    } catch (error) {
      console.log(error)
      throw error
    }
    
  }

  buildValidator(): ValidationType & SerializeErrors {
    return new ValidatorComposite([
      ...BuilderValidator.of('fcm_token').isString().build()
    ])
  }
}