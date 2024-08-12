import { LoadByInternalIdRepository } from '@/data/domain/features';
import { Controller, HttpRequest, HttpResponse } from '@/application/contract';
import { badRequest, ok } from '@/application/helpers/http';

type ParamsInput = {
  id: string
} 

export class LoadMemberByInternalIdController extends Controller<any, any> {
  constructor (private readonly pgMemberRepository: LoadByInternalIdRepository) {super()}
  async perform(httpRequest: HttpRequest<any, ParamsInput>): Promise<HttpResponse<any>> {
    const { params } = httpRequest
    if (!params) return badRequest('id')
    return ok(await this.pgMemberRepository.loadByInternalId(params?.id))
  }
}