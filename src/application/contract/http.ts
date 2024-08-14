import { type ErrorModel } from '@/application/helpers/error-model'

export interface HttpResponse<T> {
  statusCode: number
  body: { errors: ErrorModel[] } | T
}

export interface HttpRequest<B = unknown, P = unknown> {
  body?: B
  params?: P
  query?: unknown
  contentType?: string
}
