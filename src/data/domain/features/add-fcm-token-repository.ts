export interface AddFcmTokenRepository {
  add (fcm_token: string): Promise<boolean>
}