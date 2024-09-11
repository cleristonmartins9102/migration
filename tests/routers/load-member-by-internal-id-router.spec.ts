// TODO: FIX THIS TEST

import sm, { Contracts } from '@adamsfoodservice/shared-modules'
import { createApp } from '@/main/config/app'
import request from 'supertest'
import { NextFunction } from 'express'
import { DeliveryModel } from '@adamsfoodservice/core-models'
import { makeFakeMember } from '../stubs'

const fakeData = makeFakeMember()



vi.mock('../../src/infra/repository/pg-member-repository.ts', () => {
  return {
    PgMemberRepository: function () {
      return {
        update: () => makeFakeMember(),
        loadById: () => makeFakeMember(),
        loadByInternalId: () => makeFakeMember()
      }
    }
  }
})

describe('Load member by internal_id Router', () => {
  it('should return 400 if missing id', async () => {
    const httpResponse = await request(await createApp())
      .post('/api/member/v1/load/internal-id')
      .send()
  })

  it('should return 400 if order_id is not provided', async () => {
  })

  it('should return 404 if order_id not exists', async () => {
  })

  it('should return 200 on succeds', async () => {
  })
})
