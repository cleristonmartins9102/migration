import { Controller, HttpRequest, HttpResponse } from '@/application/contract';
import { ok } from '@/application/helpers/http';
import { PgAuditRepository } from '@/infra/repository/pg-audit-repository';

export class CreateAuditController extends Controller<any, any> {
  constructor (private readonly pgAuditRepository: PgAuditRepository) {
    super()
  }

  async perform(httpRequest: HttpRequest<any, unknown>): Promise<HttpResponse<any>> {
    const response = await this.pgAuditRepository.create(httpRequest.body)
    return ok(response)
  }
}