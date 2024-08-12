import { Controller, HttpRequest, HttpResponse, ValidationType } from '@/application/contract';
import { SerializeErrors } from '@/application/contract/validation';
import { badRequest, ok } from '@/application/helpers/http';
import { UpdateWalletBalanceRepository } from '@/data/domain/features';
import { ValidatorComposite } from '@/validator';
import { BuilderValidator } from '@/validator/build-validator';

type InputBody = {
  internal_id: string
  balance: number
}
export class UpdateWalletController extends Controller<any, any> {
  constructor (private readonly pgMemberRepository: UpdateWalletBalanceRepository) {super()}
  async perform(httpRequest: HttpRequest<InputBody, unknown>): Promise<HttpResponse<any>> {
    const { body } = httpRequest
    if (!body) return badRequest('body')
    const pgMemberResponse = await this.pgMemberRepository.updateBalance(body)
    return ok(pgMemberResponse)
  }

  buildValidator(): ValidationType & SerializeErrors {
    return new ValidatorComposite([
      ...BuilderValidator.of('internal_id').isString().build(),
      ...BuilderValidator.of('balance').isNumber().build()
    ])
  }
}