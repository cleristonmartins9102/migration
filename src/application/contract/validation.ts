import { type ErrorModel } from '@/application/helpers/error-model'
import { type CustomError } from '../errors'

export interface Validation<PT = unknown, R= CustomError | null> {
  validate (input: PT): Promise<R>
}

export interface SerializeErrors {
  serializeError (): ErrorModel[]
}
