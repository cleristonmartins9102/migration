import { Router } from 'express';
import { expressAdapter } from '../../adapters';
import { acceptMemberControllerFactory } from '@/main/factories/controller';

export const acceptMemberRouter = (router: Router): void => {
  router.post('/accept/:id', expressAdapter(acceptMemberControllerFactory()))
}