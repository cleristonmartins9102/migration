import { Router } from 'express';
import { expressAdapter } from '../../adapters';
import { rejectMemberControllerFactory } from '@/main/factories/controller';

export const rejectMemberRouter = (router: Router): void => {
  router.post('/reject', expressAdapter(rejectMemberControllerFactory()))
}