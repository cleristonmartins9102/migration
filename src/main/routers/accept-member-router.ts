import { Router } from 'express';
import { expressAdapter } from '../adapters';
import { acceptMemberControllerFactory } from '../factories/controller/accept-member-controller-factory';

export const acceptMemberRouter = (router: Router): void => {
  router.post('/accept/:id', expressAdapter(acceptMemberControllerFactory()))
}