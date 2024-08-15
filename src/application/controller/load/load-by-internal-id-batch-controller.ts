import { Controller, HttpRequest, HttpResponse, ValidationType } from '@/application/contract';
import { SerializeErrors } from '@/application/contract/validation';
import { badRequest, ok } from '@/application/helpers/http';
import { LoadByInternalIdBatchRepository } from '@/data/domain/features/load';
import { ValidatorComposite } from '@/validator';
import { BuilderValidator } from '@/validator/build-validator';

type InputBody = {
  batch: string[]
}
export class LoadByInternalIdBatchController extends Controller<any, any> {
  constructor (private readonly pgMemberRepository: LoadByInternalIdBatchRepository) {  super() }
  async perform(httpRequest: HttpRequest<InputBody, unknown>): Promise<HttpResponse<any>> {
    const { body } = httpRequest
    if (!body) return badRequest('body')
    const repositoryResponse = await this.pgMemberRepository.loadByInternalIdBatch(body.batch)
    return ok(repositoryResponse)
  }

  buildValidator(): ValidationType & SerializeErrors {
    return new ValidatorComposite([
      ...BuilderValidator.of('batch').isArray().build()
    ])
  }
}