import { UpdateMember } from '@/data/domain/features/update-member';
import { Controller, HttpRequest, HttpResponse, ValidationType } from '../contract';
import { RecordNotFoundError } from '../errors';
import { notFound, ok } from '../helpers/http';
import { SerializeErrors } from '../contract/validation';
import { ValidatorComposite } from '@/validator';
import { BuilderValidator } from '@/validator/build-validator';

export class UpdateMemberController extends Controller<any, any> {
  constructor (private readonly dbUpdateMember: UpdateMember) { super()}
  async perform(httpRequest: HttpRequest<any, unknown>): Promise<HttpResponse<any>> {
    const { body }  = httpRequest
    try {
      await this.dbUpdateMember.update(body)
      return ok(true)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFound(error.message)
      }
      throw error
    }
  }

  buildValidator(): ValidationType & SerializeErrors {
    return new ValidatorComposite([
      ...BuilderValidator.of('id').isString().build()
    ])
  }
}