import sm, { Contracts } from '@adamsfoodservice/shared-modules'
import { createApp } from '@/main/config/app'
import request from 'supertest'
import { NextFunction, Request, Response } from 'express'
import { makeFakeMember } from '../../tests/stubs/make-member-stub'


jest.mock('../../src/infra/repository/pg-member-repository.ts', () => {
  return {
    PgMemberRepository: function () {
      return {
        create: () => makeFakeMember()
      }
    }
  }
})

jest.mock('@adamsfoodservice/shared-middleware', () => ({
  Middleware: {
    userAuth: () => (req: Request, res: Response, next: NextFunction) => { },
    serviceAccountAuthMiddleware: (permissionPath: string, storage: Contracts.Storage.SetStorage) => {
      return (subject: string, action: string) => {
        return (req: any, res: any, next: NextFunction) => {
          new sm.Hooks.AsyncScope(() => {
            storage.set({ email: 'fake' })
            next()
          })
        }
      }
    }
  }
}))

describe('Create Delivery Router', () => {
  it('should return 400 if missing order_id', async () => {
    const httpResponse = await request(await createApp())
      .put('/api/member/v1/create')
      .send()
      .expect(400)
    expect(httpResponse.body.filter((error: any) => error.parameter === 'user_account_id').length > 0).toBeTruthy()
  })

  it('should return 400 if missing first_name', async () => {
    const httpResponse = await request(await createApp())
      .put('/api/member/v1/create')
      .send()
      .expect(400)
    expect(httpResponse.body.filter((error: any) => error.parameter === 'first_name').length > 0).toBeTruthy()
  })

  it('should return 400 if missing last_name', async () => {
    const httpResponse = await request(await createApp())
      .put('/api/member/v1/create')
      .send()
      .expect(400)
    expect(httpResponse.body.filter((error: any) => error.parameter === 'last_name').length > 0).toBeTruthy()
  })

  it('should return 400 if missing last_name', async () => {
    const httpResponse = await request(await createApp())
      .put('/api/member/v1/create')
      .send()
      .expect(400)
    expect(httpResponse.body.filter((error: any) => error.parameter === 'last_name').length > 0).toBeTruthy()
  })

  it('should return 400 if missing internal_id', async () => {
    const httpResponse = await request(await createApp())
      .put('/api/member/v1/create')
      .send()
      .expect(400)
    expect(httpResponse.body.filter((error: any) => error.parameter === 'internal_id').length > 0).toBeTruthy()
  })

  it('should return 400 if missing role', async () => {
    const httpResponse = await request(await createApp())
      .put('/api/member/v1/create')
      .send()
      .expect(400)
    expect(httpResponse.body.filter((error: any) => error.parameter === 'role').length > 0).toBeTruthy()
  })

  it('should return 400 if missing branch', async () => {
    const httpResponse = await request(await createApp())
      .put('/api/member/v1/create')
      .send()
      .expect(400)
    expect(httpResponse.body.filter((error: any) => error.parameter === 'branch').length > 0).toBeTruthy()
  })


  it('should return 400 if missing location', async () => {
    const httpResponse = await request(await createApp())
      .put('/api/member/v1/create')
      .send()
      .expect(400)
    expect(httpResponse.body.filter((error: any) => error.parameter === 'location').length > 0).toBeTruthy()
  })

  it('should return 400 if missing shop', async () => {
    const httpResponse = await request(await createApp())
      .put('/api/member/v1/create')
      .send()
      .expect(400)
    expect(httpResponse.body.filter((error: any) => error.parameter === 'shop').length > 0).toBeTruthy()
  })


  it('should return 201 on succeds', async () => {
    const httpResponse = await request(await createApp()).put('/api/member/v1/create')
      .send(makeFakeMember())
    expect(httpResponse.statusCode).toBe(201)
  })
})
