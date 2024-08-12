export interface UpdateWalletBalanceRepository {
  updateBalance(params: UpdateWalletRepository.Params): Promise<boolean>
}

export namespace UpdateWalletRepository {
  export type Params = {
    internal_id: string
    balance: number
  }
}