import sm, { Contracts } from '@adamsfoodservice/shared-modules'
import { createApp } from '@/main/config/app'
import request from 'supertest'
import { NextFunction } from 'express'
import { DeliveryModel } from '@adamsfoodservice/core-models'
import { makeFakeMember } from '../../tests/stubs'

const fakeData = makeFakeMember()



jest.mock('../../src/infra/repository/pg-member-repository.ts', () => {
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
  it.only('should return 400 if missing id', async () => {
    const httpResponse = await request(await createApp())
      .post('/api/member/v1/update')
      .send()
      .expect(400)
      expect(httpResponse.body.filter((error: any) => error.parameter === 'id').length > 0).toBeTruthy()

  })

  // it('should return 400 if order_id is not provided', async () => {
  //   const httpResponse = await request(await createApp())
  //     .post('/api/delivery/v1/update')
  //     .send({ ...fakeData, order_id: undefined, id: 1, order: { ...fakeData.order, order_id: undefined } })
  //     .expect(400)
  //   expect(httpResponse.body).toEqual([
  //     { error: 'required parameter error', parameter: 'order_id' }
  //   ])
  // })

  // it('should return 404 if order_id not exists', async () => {
  //   const httpResponse = await request(await createApp())
  //     .post('/api/delivery/v1/update')
  //     .send({
  //       ...fakeData,
  //       order: {
  //         ...fakeData.order,
  //         order_id: 999999
  //       }
  //     })
  //   expect(httpResponse.body).toEqual({ error: 'Delivery was not found with order_id 999999' })
  // })

  // it('should return 200 on succeds', async () => {
  //   const { connection } = await (new MakeDsStub()).build()
  //   const repo = await connection.getRepository(PgDelivery)
  //   const { repoResponse } = await createNewDelivery(repo)
  //   const httpResponse: any = await new Promise((resolve, reject) => {
  //     new sm.Hooks.AsyncScope(async () => {
  //       (new sm.Str.AsyncStorage('auth')).set({ email: 'user@email.com' })
  //       request(await createApp()).post('/api/delivery/v1/update')
  //         .send({ ...repoResponse, order: { ...repoResponse.order, status: DeliveryModel.Status.Delivered } })
  //         .then(r => resolve(r))
  //     })
  //   })
  //   expect(httpResponse.statusCode).toBe(200)
  //   expect(httpResponse.body).toBe(true)
  // })
})
