import { UpdateMemberModel } from '@/data/domain/features/update/update-member';
import { Controller, HttpRequest, HttpResponse } from '@/application/contract';
import { RecordNotFoundError } from '@/application/errors';
import { badRequest, notFound, ok } from '@/application/helpers/http';
import { RequiredParameterValidator, ValidatorComposite } from '@/validator';
import { UpdateMemberWithFlexibleParams } from '@/data/features/update/update-member-with-fleixibile-params';
import sm from '@adamsfoodservice/shared-modules'
import { BuilderValidator } from '@/validator/build-validator';
import { AllowedContentTypesValidator } from '@/validator/allowed-content-types-validator';
import { ContentTypes } from '@/application/enum/content-types-enum';
import { storage } from '@/application/storage/storage';

type InputBody = UpdateMemberModel & { file: string }
export class UpdateMemberController extends Controller<any, any> {
  constructor(private readonly dbUpdateMember: UpdateMemberWithFlexibleParams) { super() }
  async perform(httpRequest: HttpRequest<InputBody, any>): Promise<HttpResponse<any>> {
    const { body, contentType } = httpRequest
    if (!body) return badRequest('body')
    try {
      const validator = new AllowedContentTypesValidator([ContentTypes.Json, ContentTypes.Urlencoded])
      const error = await validator.validate(contentType as string)
      if (error) return badRequest(error.message)
      if (contentType === ContentTypes.Urlencoded) { // Update by system
        const validator = new RequiredParameterValidator('file')
        const error = await validator.validate(body)
        if (error) return badRequest(error)
        const { translatedData } = sm.Translate.translateErpDataToApiModel().translate(body.file)
        if (translatedData.length === 0) return ok(false)
        return ok(await this.dbUpdateMember.update(translatedData[0] as any))
      } else { // Update by user
        if (!body.internal_id) {
          body.user_account_id = (storage.currentUser.get() as any).id
        }
        return ok(await this.dbUpdateMember.update(body as UpdateMemberModel))
      }
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFound(error.message)
      }
      throw error
    }
  }
}