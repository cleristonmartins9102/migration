import { HttpResponse } from '@/application/contract'
import sm from '@adamsfoodservice/shared-modules'

export const created = <T>(data: T): HttpResponse<T> => {
  const createdAt: any = (data as any).created_at
  const updatedAt: any = (data as any).updated_at
  if (createdAt && createdAt instanceof sm.DateTime.MomentAdapter) {
    (data as any).created_at = (data as any).created_at.format('YYYY-MM-DD HH:mm:ss')
  }
  if (updatedAt && updatedAt instanceof sm.DateTime.MomentAdapter) {
    (data as any).updated_at = (data as any).updated_at.format('YYYY-MM-DD HH:mm:ss')
  }
  return { statusCode: 201, body:  data }
}