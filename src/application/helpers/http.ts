import { type HttpResponse } from '../contract'

export const ok = <T>(data: T): HttpResponse<T> => ({ statusCode: 200, body: data })
export const noContent = <T>(data: T): HttpResponse<T> => ({ statusCode: 204, body: data })
export const created = <T>(data: T): HttpResponse<T> => ({ statusCode: 201, body: data })
export const badRequest = <T>(body: T): HttpResponse<T> => ({ statusCode: 400, body })
export const notFound = <T>(body: T): HttpResponse<T> => ({ statusCode: 404, body: { error: body } as any })
export const serverError = (error: Error): HttpResponse<string> => ({ statusCode: 500, body: error.message })
