import { LoadByInternalIdRepository } from '@/data/domain/features';
import { Controller, HttpRequest, HttpResponse } from '@/application/contract';
import { badRequest, ok } from '@/application/helpers/http';
import memberModelToFirebaseSchema from '@/application/utils/dto';

type ParamsInput = {
  id: string
} 

export class LoadMemberByInternalIdController extends Controller<any, any> {
  constructor (private readonly pgMemberRepository: LoadByInternalIdRepository) {super()}
  async perform(httpRequest: HttpRequest<any, ParamsInput>): Promise<HttpResponse<any>> {
    const { params } = httpRequest
    if (!params) return badRequest('id')
    const response = await this.pgMemberRepository.loadByInternalId(params?.id)
    if(!response) return badRequest('id')
    const mappedResponse = memberModelToFirebaseSchema(response)
    return ok(mappedResponse)
  }
}