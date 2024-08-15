import { Controller, HttpRequest, HttpResponse, ValidationType } from '@/application/contract';
import { SerializeErrors } from '@/application/contract/validation';
import { badRequest, ok } from '@/application/helpers/http';
import { DeleteMemberRepository } from '@/data/domain/features/delete/delete-member-repository';
import { LoadByEmailRepository } from '@/data/domain/features/load';
import { ValidatorComposite } from '@/validator';
import { BuilderValidator } from '@/validator/build-validator';

type InputBody = {
  email: string
}
export class RejectMemberController extends Controller<any, any> {
  constructor (private readonly pgMemberRepository: LoadByEmailRepository & DeleteMemberRepository) { super() }
  async perform(httpRequest: HttpRequest<InputBody, unknown>): Promise<HttpResponse<any>> {
    const { body } = httpRequest
    if (!body) return badRequest('body')
    const repositoryResponse = await this.pgMemberRepository.loadByEmail(body.email)
    if (!repositoryResponse) {
      return badRequest({
        email: body.email,
        message: 'Member not found'
      })
    }
    await this.pgMemberRepository.delete(repositoryResponse.id)
   return ok({
    email: body.email,
    message: 'rejected with success'
  })
  }

  buildValidator(): ValidationType & SerializeErrors {
    return new ValidatorComposite([
      ...BuilderValidator.of('email').validateEmail().build()
    ])
  }
}