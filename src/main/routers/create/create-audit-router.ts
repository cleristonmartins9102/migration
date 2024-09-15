import { Router } from 'express'
import { expressAdapter } from '@/main/adapters'
import { CreateAuditController } from '@/application/controller/create/create-audit-controller'
import { PgAuditRepository } from '@/infra/repository/pg-audit-repository'

export const createAuditRouter = (router: Router): void => {
  router.post('/audit/v1/create', expressAdapter((new CreateAuditController(new PgAuditRepository()))))
}
