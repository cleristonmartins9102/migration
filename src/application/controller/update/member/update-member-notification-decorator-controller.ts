import { Controller, HttpRequest, HttpResponse } from '@/application/contract';
import { UpdateMemberController } from './update-member-controller';
import { PopulateEmail } from '@/data/services';

export class UpdateMemberNotificationDecoratorController extends Controller<any, any> {
  constructor (
    private readonly updateMemberController: UpdateMemberController,
    private readonly populateEmailService: PopulateEmail

  ) {super()}
  async perform(httpRequest: HttpRequest<any, unknown>): Promise<HttpResponse<any>> {
    const updateMemberControllerResponse = await this.updateMemberController.handler(httpRequest)
    if (updateMemberControllerResponse.body?.contact.phone_number) {
      await this.populateEmailService()
    }
    return updateMemberControllerResponse
  }
}