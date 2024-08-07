import { Controller, HttpRequest, HttpResponse, ValidationType } from '@/application/contract';
import { SerializeErrors } from '@/application/contract/validation';
import { badRequest, ok } from '@/application/helpers/http';
import { UpdateMemberSettings } from '@/data/domain/features/update/update-member-settings';
import { ValidatorComposite } from '@/validator';
import { BuilderValidator } from '@/validator/build-validator';



export class UpdateMemberSettingsController extends Controller<any, any> {
  constructor (private readonly updateMemberSettingsUseCase: UpdateMemberSettings) { super() }
  async perform(httpRequest: HttpRequest<UpdateMemberSettingsController.InputBody, unknown>): Promise<HttpResponse<any>> {
    const { body } = httpRequest
    if (!body) return badRequest('body')
    return ok(await this.updateMemberSettingsUseCase.update(body as any))
  }

  buildValidator(): ValidationType & SerializeErrors {
    return new ValidatorComposite([
      ...BuilderValidator.of('id').isString().build(),
      ...BuilderValidator.of('config').isObject().build(),
      ...BuilderValidator.of('resource').isString().build()
    ])
  }
}

export namespace UpdateMemberSettingsController {
  export type InputBody = {
    id: string
    resource: string
    config: {
      flag: boolean
      type: string
    }
  }
}