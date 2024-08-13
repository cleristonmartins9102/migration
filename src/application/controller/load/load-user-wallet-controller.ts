import { Controller, HttpRequest, HttpResponse } from '@/application/contract';
import { ok } from '@/application/helpers/http';
import { LoadUserWalletRepository } from '@/data/domain/features/load';

type Output = {
  wallet_balance: number
}

export class LoadUserWalletController extends Controller<any, any> {
  constructor (private readonly pgMemberRepository: LoadUserWalletRepository) { super ()}
  async perform(httpRequest: HttpRequest<any, unknown>): Promise<HttpResponse<Output>> {
    const repositoryResponse = await this.pgMemberRepository.loadWallet()
    if (repositoryResponse) {
      return ok({ wallet_balance: repositoryResponse.balance })
    }
    return ok({ wallet_balance: 0 })
  }
}