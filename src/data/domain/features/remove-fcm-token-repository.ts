export interface RemoveFcmTokenRepository {
  remove (fcm_token: string): Promise<boolean>
}