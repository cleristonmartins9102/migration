import { Controller, HttpRequest, HttpResponse } from '@/application/contract';
import { ok } from '@/application/helpers/http';
import { LoadAllRepository } from '@/data/domain/features/load';
import { LoadWithCriteriaRepository } from '@/data/domain/features/load/load-with-criteria-repository'
import { Contracts, SQL } from '@adamsfoodservice/shared-modules';

export class LoadAllMembersController extends Controller<any, any> {
  constructor (private readonly pgMemberRepository: LoadAllRepository & LoadWithCriteriaRepository) { super()}
  
  async perform(httpRequest: HttpRequest<any, unknown>): Promise<HttpResponse<any>> {
    const { query } = httpRequest
    if (query) {
      const criteria = new SQL.Criteria()
      let count = 1
      for (const q in query ) {
        if (count <= Object.keys(query).length) {
          criteria.add(new SQL.Filter(q, '=', (query as any)[q]))
        }
        count++
      }
      const repositoryResponse = await this.pgMemberRepository.loadWithCriteria(criteria)

      return ok(repositoryResponse)
    } else {
      const repositoryResponse = await this.pgMemberRepository.loadAll()
      return ok(repositoryResponse)
    }
  }
}