import { Controller, HttpRequest, HttpResponse } from '@/application/contract';
import { UpdateWalletController } from './update-wallet-controller';
import { badRequest, ok } from '@/application/helpers/http';
import sm from '@adamsfoodservice/shared-modules'

type InputBody = {
  file: string
}

type UpdatedWallets = {
  wallet: {
    sn_account: string
    sn_wallbal: string
  },
  message: string
}
export class UpdateWalletBalanceFromErpDataController extends Controller<any, any> {
  constructor(private readonly updateWalletController: UpdateWalletController) { super() }
  async perform(httpRequest: HttpRequest<InputBody, unknown>): Promise<HttpResponse<any>> {
    const { body } = httpRequest
    if (!body) return badRequest('body')
    const csvTranslate = sm.Translate.translateErpDataToApiModel().translate(body.file)
    const updatedWallet: Array<UpdatedWallets> = []
    for (const wallet of csvTranslate.translatedData) {
      const repositoryResponse = await this.updateWalletController.handler({ body: { ...wallet, balance: Number(wallet.balance) } })
      if (repositoryResponse.statusCode === 200) {
        updatedWallet.push({ wallet: { sn_account: wallet.internal_id, sn_wallbal: wallet.balance }, message: 'updated' })
      } else {
        updatedWallet.push({ wallet: { sn_account: wallet.internal_id, sn_wallbal: wallet.balance }, message: repositoryResponse.body.replace('internal_id', 'sn_account') })
      }
    }
    return ok(updatedWallet)
  }
}