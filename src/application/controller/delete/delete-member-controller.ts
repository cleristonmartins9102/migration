import { Controller, HttpRequest, HttpResponse } from '@/application/contract';
import { RecordNotFoundError } from '@/application/errors';
import { notFound, ok } from '@/application/helpers/http';
import { DeleteMember } from '@/data/domain/features/delete/delete-member';

type Input = {
  id?: string
  internal_id?: string
}


export class DeleteMemberController extends Controller<any, any> {
  constructor (private readonly dbDeleteMember: DeleteMember) {super()}
  async perform(httpRequest: HttpRequest<Input, Input>): Promise<HttpResponse<any>> {
    const { params, body } = httpRequest
    try {
      const dbDeleteResponse = await this.dbDeleteMember.delete({ id: params?.id ?? body?.id, internal_id: params?.internal_id ?? body?.internal_id })
      return ok(dbDeleteResponse)
    } catch (error) {
      if (error instanceof RecordNotFoundError) return notFound(error.message)
      throw error
    }
  }
}