import { Controller, HttpRequest, HttpResponse } from '@/application/contract';
import { badRequest, ok } from '@/application/helpers/http';
import memberModelToFirebaseSchema from '@/application/utils/dto';
import { LoadByPhoneNumberRepository } from '@/data/domain/features/load';

type InputParams = {
  phone_number: string
}

export class LoadMemberByPhoneNumberController extends Controller<any, any> {
  constructor (private readonly pgMemberRepository: LoadByPhoneNumberRepository) { super()}
  async perform(httpRequest: HttpRequest<any, InputParams>): Promise<HttpResponse<any>> {
    const { params } = httpRequest
    if (!params) return badRequest('params')
    const repositoryResponse = await this.pgMemberRepository.loadByPhoneNumber(params?.phone_number)
    if(!repositoryResponse) return badRequest('phone_number')
    const mappedResponse = memberModelToFirebaseSchema(repositoryResponse)
    return ok(mappedResponse)
  }
}