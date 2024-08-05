import { CreateMemberRepository } from '@/data/domain/features/create-member-repository'
import { Controller, HttpRequest, HttpResponse } from '../contract'
import { created } from '../helpers/http'

export class CreateMemberController extends Controller<any, any> {
  constructor(private readonly pgMemberRepository: CreateMemberRepository) { super() }

  async perform(httpRequest: HttpRequest<any, unknown>): Promise<HttpResponse<any>> {
    const { body } = httpRequest
    const repositoryResponse = await this.pgMemberRepository.create(body)
    return created(repositoryResponse)
  }
}