import { PgMemberRepository } from '@/infra/repository/pg-member-repository'
import { makeFakeMember } from '../../../tests/stubs/make-member-stub'
import timekeeper from 'timekeeper';
import sm from '@adamsfoodservice/shared-modules'
import { MemberModel } from '@adamsfoodservice/core-models';
import { PrismaClient } from '@prisma/client';
import { PostgreSqlContainer } from '@testcontainers/postgresql'; 
import { resetDb } from 'tests/helpers/resetDb';
import prismaClient from 'prisma/prisma-client-object';


describe('PgMemberRepository', () => {
  let createMemberData: MemberModel
  const { ...rest } = makeFakeMember()

  let postgresContainer: any;
  let client: PrismaClient;
  
  beforeAll(async () => {
    timekeeper.freeze('2024-08-05T11:47:36')
    postgresContainer = await new PostgreSqlContainer().start();
    client = new PrismaClient()
  })

  beforeEach(() => {
    createMemberData = makeFakeMember()
  })

  afterAll(async () => {
    await client.$disconnect()
    await postgresContainer.stop();
  })

  describe('Save', () => {
    beforeEach(async () => {
    })

    it.only('should call findUnique with correct value', async () => {
      const sut = new PgMemberRepository()
      const spy = vi.spyOn(client.member, 'findUnique')

      await sut.create(createMemberData, client)

      expect(spy).toHaveBeenCalled()

      expect(spy).toHaveBeenCalledWith({ where: { user_account_id: createMemberData.user_account_id } })
    })

    it('should throw MemberAlreadyExistsError if user with user_account_id exists', async () => {

      const sut = new PgMemberRepository()

      await sut.create(createMemberData, client)

      await expect(sut.create(createMemberData, client)).rejects.toThrow()
    })



    it('should call member.create with correct value', async () => {
      const sut = new PgMemberRepository()
      const spy = vi.spyOn(sut, 'create')
      const { wallet, location, settings, contact, ...rest } = createMemberData
      await sut.create(createMemberData, client)
      expect(spy).toHaveBeenCalled()
      expect(spy).toHaveBeenCalledWith(createMemberData, client)
    })

    it('should call contact.create with correct value', async () => {
      const sut = new PgMemberRepository()
      const { wallet, location, settings, contact, ...rest } = createMemberData
      const spy = vi.spyOn(client.contact, 'create')
      const result = await sut.create(createMemberData, client)
      expect(spy).toHaveBeenCalled()
      expect(client.contact.create).toBe({})
    })

    it('should call address.create with correct value', async () => {
      const sut = new PgMemberRepository()
      const { wallet, location, settings, contact, ...rest } = createMemberData
      await sut.create(createMemberData, client)
    })

    it('should call settings.create with correct value', async () => {
      const sut = new PgMemberRepository()
      const { wallet, location, settings, contact, ...rest } = createMemberData
      await sut.create(createMemberData, client)
      const deliveryDays = settings.delivery_day
      const settingsHandled = {
        can_deliver : settings.can_deliver,
        delivery_day : deliveryDays,
        push_asked : settings.push_asked,
        marketing_email : settings.marketing_email,
        marketing_push : settings.marketing_push,
        marketing_sms : settings.marketing_sms,
        transactional_email : settings.transactional_email,
        transactional_push : settings.transactional_push,
        transactional_sms : settings.transactional_sms
      }
      expect(prismaClient.settings.create).toHaveBeenCalled()
      expect(prismaClient.settings.create).toHaveBeenCalledWith({ data: { ...settingsHandled, member: { connect: { id: '1' } } } })
    })

    it('should call wallet.create with correct value', async () => {
      const sut = new PgMemberRepository()
      const { wallet, location, settings, contact, ...rest } = createMemberData
      await sut.create(createMemberData, client)

      expect(prismaClient.wallet.create).toHaveBeenCalled()
      expect(prismaClient.wallet.create).toHaveBeenCalledWith({ data: { ...wallet, member: { connect: { id: '1' } } } })
    })

    it('should returns the same value received from prisma', async () => {
      const sut = new PgMemberRepository()
      const data = await sut.create(createMemberData, client)
      expect(data).toMatchObject({ ...rest, id: '1' })
    })

    it('should rethrow if prisma throws', async () => {
      const sut = new PgMemberRepository()

      await expect(sut.create(createMemberData, client)).rejects.toThrow()
    })
  })

  describe('LoadById', () => {
    it('should call findUnique with correct value', async () => {
      const sut = new PgMemberRepository()

      await sut.loadById('2')

      // expect(findUniqueMock).toHaveBeenCalled()
      // expect(findUniqueMock).toHaveBeenCalledWith({ where: { id: 2 } })
    })
  })

  describe('Update', () => {
    it('should call update with correct value', async () => {
     // findUniqueMock.mockResolvedValueOnce({ id: 2, role: 'dev' })
      const sut = new PgMemberRepository()

      await sut.update({ id: '2', role: 'new role' })

      // expect(updateMock).toHaveBeenCalled()
      // expect(updateMock).toHaveBeenCalledWith({ where: { id: 2 }, data: { role: 'new role' } })
    })
  })
})