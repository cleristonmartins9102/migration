import { Controller, HttpRequest, HttpResponse, ValidationType } from '@/application/contract';
import { SerializeErrors } from '@/application/contract/validation';
import { ValidatorComposite } from '@/validator';
import { BuilderValidator } from '@/validator/build-validator';
import { UpdateMemberSettingsController } from './update-member-settings-controller';
import { UpdateMemberSettings } from '@/data/domain/features/update/update-member-settings';
import { badRequest } from '@/application/helpers/http';

type InputBody = {
  id: string
  data: {
    flag: boolean
    type: string
  }
}
export class UpdatePushSettingsControllerAdapter extends Controller<any, any> {
  constructor (private readonly updateMemberSettingsController: UpdateMemberSettingsController) { super() }
  async perform(httpRequest: HttpRequest<InputBody, unknown>): Promise<HttpResponse<any>> {
    const { body } = httpRequest
    if (!body) return badRequest('body')
    const adaptedData: UpdateMemberSettingsController.InputBody = {
      id: body.id,
      resource: UpdateMemberSettings.Resource.push,
      config: {
        flag: body.data.flag,
        type: body.data.type
      }

    }
    return await this.updateMemberSettingsController.handler({ body: adaptedData })
  }

  buildValidator(): ValidationType & SerializeErrors {
    return new ValidatorComposite([
      ...BuilderValidator.of('id').isNan().build(),
      ...BuilderValidator.of('data').isObject().build()
    ])
  }
}