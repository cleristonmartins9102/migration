import { HttpResponse } from '@/application/contract';

export const ok = <T>(data: T): HttpResponse<T> => ({ statusCode: 200, body: data })
