// to fix

import sm, { Contracts } from '@adamsfoodservice/shared-modules'
import { createApp } from '@/main/config/app'
import request from 'supertest'
import { NextFunction } from 'express'
import { DeliveryModel } from '@adamsfoodservice/core-models'
import { makeFakeMember } from '../../tests/stubs'

const fakeData = makeFakeMember()



vi.mock('../../src/infra/repository/pg-member-repository.ts', () => {
  return {
    PgMemberRepository: function () {
      return {
        update: () => makeFakeMember(),
        loadById: () => makeFakeMember(),
      }
    }
  }
})

describe('Update member Router', () => {
  it('should return 400 if missing id', async () => {
  })

  it('should return 400 if order_id is not provided', async () => {
  })

  it('should return 404 if order_id not exists', async () => {
  })

  it('should return 200 on succeds', async () => {
  })
})
