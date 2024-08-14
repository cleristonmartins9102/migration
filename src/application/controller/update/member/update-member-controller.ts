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
      if (contentType === ContentTypes.Urlencoded) {
        const validator = new RequiredParameterValidator('file')
        const error = await validator.validate(body)
        if (error) return badRequest(error)
        const { translatedData } = sm.Translate.translateErpDataToApiModel().translate(body.file)
        if (translatedData.length === 0) return ok(false)
        await this.dbUpdateMember.update(translatedData[0] as any)
      } else {
        const validator = new ValidatorComposite([...BuilderValidator.of(['id', 'internal_id']).requiredAny().build()])
        const error = await validator.validate(body)
        if (error) return badRequest(error)
        await this.dbUpdateMember.update(body as UpdateMemberModel)
      }
      return ok(true)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFound(error.message)
      }
      throw error
    }
  }
}