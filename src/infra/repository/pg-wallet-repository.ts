import { PrismaError, RecordNotFoundError } from '@/application/errors';
import { UpdateWalletBalanceRepository, UpdateWalletRepository } from '@/data/domain/features';
import { PrismaClient } from '@prisma/client';

export class PgWalletRepository implements UpdateWalletBalanceRepository {
  async updateBalance(params: UpdateWalletRepository.Params): Promise<boolean> {
    const prisma = new PrismaClient();
    try {
      const member = await prisma.member.findUnique({ where: { internal_id: params.internal_id }, include: { wallet: true } })
      if (!member) throw new RecordNotFoundError('member', 'internal_id', params.internal_id)
      const wallet: any = { ...member.wallet, balance: params.balance }
      await prisma.wallet.update({ where: { id: wallet.id }, data: { balance: params.balance } })
    } catch (error) {
      if (error instanceof Error)
      throw new PrismaError(error)
    }
    return true
  }
}