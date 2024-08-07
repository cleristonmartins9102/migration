import { CreateMemberRepository } from '@/data/domain/features/create-member-repository'
import { Controller, HttpRequest, HttpResponse, ValidationType } from '../contract'
import { badRequest, created } from '../helpers/http'
import { MemberAlreadyExistsError } from '../errors'
import { SerializeErrors } from '../contract/validation'
import { ValidatorComposite } from '@/validator'
import { BuilderValidator } from '@/validator/build-validator'
import { FormatMemberData } from '@/data/services'
import { CreateMemberModelFactory } from '../utils/create-member-model-factory'


export class CreateMemberController extends Controller<any, any> {
  constructor(
    private readonly pgMemberRepository: CreateMemberRepository,
    private readonly formatMemberDataService: FormatMemberData
  ) { super() }

  async perform(httpRequest: HttpRequest<CreateMemberController.Input, unknown>): Promise<HttpResponse<any>> {
    const { body } = httpRequest
    let repositoryResponse: any
    try {
      if (body) {
        repositoryResponse = await this.pgMemberRepository.create(this.formatMemberDataService(CreateMemberModelFactory.factory(body)))
      }
    } catch (error) {
      if (error instanceof MemberAlreadyExistsError) {
        return badRequest({ error: error.message })
      }
      throw error
    }
    return created(repositoryResponse)
  }

  buildValidator(): ValidationType & SerializeErrors {
    const validators = [
      ...BuilderValidator.of('id').isString().build(),
      ...BuilderValidator.of('first_name').isString().build(),
      ...BuilderValidator.of('last_name').isString().build(),
      ...BuilderValidator.of('customer_type').isString().build(),
      ...BuilderValidator.of('branch_id').isString().build(),
      ...BuilderValidator.of('shop_address').isString().build(),
      ...BuilderValidator.of('shop_name').isString().build(),
      ...BuilderValidator.of('town').isString().build(),
      ...BuilderValidator.of('postcode').isString().build(),
      ...BuilderValidator.of('push').isBoolean().build(),
      ...BuilderValidator.of('sms').isBoolean().build(),
      ...BuilderValidator.of('push_marketing').isBoolean().build(),
      ...BuilderValidator.of('email_marketing').isBoolean().build(),
      ...BuilderValidator.of('sms_marketing').isBoolean().build(),
      ...BuilderValidator.of('fcm_tokens').isBoolean().build()
    ]
    return new ValidatorComposite(validators as any)
  }
}

export namespace CreateMemberController {
  export type Input = {
    id: string
    first_name: string
    last_name: string
    shop_name: string
    shop_address: string
    branch_id: string
    phone_number: string
    customer_type: string
    email: string
    town: string
    postcode: string
    push: boolean
    sms: boolean
    fcm_token: string
    push_marketing: boolean
    email_marketing: boolean
    sms_marketing: boolean
  }
}