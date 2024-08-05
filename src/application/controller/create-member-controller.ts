import { CreateMemberRepository } from '@/data/domain/features/create-member-repository'
import { Controller, HttpRequest, HttpResponse, ValidationType } from '../contract'
import { badRequest, created } from '../helpers/http'
import { MemberAlreadyExistsError } from '../errors'
import { SerializeErrors } from '../contract/validation'
import { ValidatorComposite } from '@/validator'
import { BuilderValidator } from '@/validator/build-validator'

export class CreateMemberController extends Controller<any, any> {
  constructor(private readonly pgMemberRepository: CreateMemberRepository) { super() }

  async perform(httpRequest: HttpRequest<any, unknown>): Promise<HttpResponse<any>> {
    const { body } = httpRequest
    let repositoryResponse: any
    try {
      repositoryResponse = await this.pgMemberRepository.create(body)
    } catch (error) {
      if (error instanceof MemberAlreadyExistsError) {
        return badRequest({ error: error.message })
      }
      throw error
    }
    return created(repositoryResponse)
  }

  buildValidator(): ValidationType & SerializeErrors {
    return new ValidatorComposite([
      ...BuilderValidator.of('user_account_id').isString().build(),
      ...BuilderValidator.of('first_name').isString().build(),
      ...BuilderValidator.of('last_name').isString().build(),
      ...BuilderValidator.of('customer_type').isString().build(),
      ...BuilderValidator.of('internal_id').isString().build(),
      ...BuilderValidator.of('role').isString().build(),
      ...BuilderValidator.of('branch').isObject().build(),
      ...BuilderValidator.of('location').isObject().build(),
      ...BuilderValidator.of('shop').isObject().build(),
    ])
  }
}