import { UpdateMemberNotificationDecoratorController } from '@/application/controller/update';
import { updateMemberControllerFactory } from './update-member-controller-factory';
import { populateEmailTemplateAndSendServiceFactory } from '@/main/factories/data';

export const updateMemberNotificationDecoratorControllerFactory = (): UpdateMemberNotificationDecoratorController => {
  const updateMemberController = updateMemberControllerFactory()
  const populateEmailTemplateAndSendService = populateEmailTemplateAndSendServiceFactory()
  const updateMemberNotificationDecoratorController = new UpdateMemberNotificationDecoratorController(updateMemberController, populateEmailTemplateAndSendService)
  return updateMemberNotificationDecoratorController
}