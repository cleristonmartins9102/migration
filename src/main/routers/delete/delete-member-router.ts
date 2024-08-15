import { expressAdapter } from '@/main/adapters';
import { deleteMemberControllerFactory } from '@/main/factories/controller';
import { Router } from 'express';

export const deleteMemberRouter = (router: Router): void => {
  router.delete('/', expressAdapter(deleteMemberControllerFactory()))
}