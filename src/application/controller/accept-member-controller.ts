import { AcceptMember } from '@/data/domain/features';
import { Controller, HttpRequest, HttpResponse } from '../contract';
import { badRequest, ok } from '../helpers/http';

type InputBody = {
  id: string
  internal_id: string
}

export class AcceptMemberController extends Controller<any, any> {
  constructor (private readonly acceptMemberUseCase: AcceptMember) {super()}
  async perform(httpRequest: HttpRequest<InputBody, unknown>): Promise<HttpResponse<any>> {
    const { body } = httpRequest
    if (!body) return badRequest('body')
    const usecaseResponse = await this.acceptMemberUseCase.accept(body?.id, body?.internal_id)
    return ok(usecaseResponse)
  }
}