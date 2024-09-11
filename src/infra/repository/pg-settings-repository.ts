import { FcmTokenAlreadyExistsError, PrismaError, RecordNotFoundError } from '@/application/errors';
import { storage } from '@/application/storage/storage';
import { AddFcmTokenRepository, RemoveFcmTokenRepository } from '@/data/domain/features';
import { PrismaClient } from '@prisma/client';

export class PgSettingsRepository implements AddFcmTokenRepository, RemoveFcmTokenRepository {
  async add(fcmToken: string): Promise<boolean> {
    const currentUser = storage.currentUser.get<any>()
    const prisma = new PrismaClient();
    try {
      const member = await prisma.member.findUnique({ where: { user_account_id: currentUser.id }, include: { settings: true } })
      if (!member) throw new RecordNotFoundError('member', 'user_account_id', currentUser.id)
      const currentTokens = member.settings?.fcm_tokens
      if (Array.isArray(currentTokens)) {
        if (currentTokens.includes(fcmToken)) throw new FcmTokenAlreadyExistsError(fcmToken)
        currentTokens.push(fcmToken)
        const settings: any = { ...member.settings, fcm_tokens: currentTokens }
        await prisma.settings.update({ where: { id: settings.id }, data: settings })
        return true
      }
      return false
    } catch (error) {
      if (error instanceof FcmTokenAlreadyExistsError) throw error
      if (error instanceof Error) throw new PrismaError(error)
    }
    return true
  }

  async remove(fcmToken: string): Promise<boolean> {
    const currentUser = storage.currentUser.get<any>()
    const prisma = new PrismaClient();
    try {
      const member = await prisma.member.findUnique({ where: { user_account_id: currentUser.id }, include: { settings: true } })
      if (!member) throw new RecordNotFoundError('member', 'user_account_id', currentUser.id)
      const currentTokens = member.settings?.fcm_tokens
      if (Array.isArray(currentTokens)) {
        if (!currentTokens.includes(fcmToken)) return false
        const newTokens = currentTokens.filter(token => token !== fcmToken)
        const settings: any = { ...member.settings, fcm_tokens: newTokens }
        await prisma.settings.update({ where: { id: settings.id }, data: settings })
        return true
      }
      return false
    } catch (error) {
      if (error instanceof Error) throw new PrismaError(error)
    }
    return true
  }
}