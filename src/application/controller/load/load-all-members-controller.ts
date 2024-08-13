import { Controller, HttpRequest, HttpResponse } from '@/application/contract';
import { ok } from '@/application/helpers/http';
import { LoadAllRepository } from '@/data/domain/features/load';

export class LoadAllMembersController extends Controller<any, any> {
  constructor (private readonly pgMemberRepository: LoadAllRepository) { super()}
  
  async perform(httpRequest: HttpRequest<any, unknown>): Promise<HttpResponse<any>> {
    const repositoryResponse = await this.pgMemberRepository.loadAll()
    return ok(repositoryResponse)
  }
}