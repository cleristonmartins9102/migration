import { PgMemberRepository } from '@/infra/repository/pg-member-repository'
import { makeFakeMember } from '../../../tests/stubs/make-member-stub'
import timekeeper from 'timekeeper';
import sm from '@adamsfoodservice/shared-modules'
import { MemberModel } from '@adamsfoodservice/core-models';
import { PrismaClient } from '@prisma/client';
import { PostgreSqlContainer } from '@testcontainers/postgresql'; 
import { resetDb } from 'tests/helpers/resetDb';


describe('PgMemberRepository', () => {
  let createMemberData: MemberModel
  const { ...rest } = makeFakeMember()

  let postgresContainer: any;
  let client: PrismaClient;
  
  beforeAll(async () => {
    timekeeper.freeze('2024-08-05T11:47:36')
    postgresContainer = await new PostgreSqlContainer().start();
    client = new PrismaClient({
      datasourceUrl: 'postgresql://postgres:postgres@localhost:5432/member-dev-local',
    })
    await client.$connect();
  })

  beforeEach(() => {
    createMemberData = makeFakeMember()
  })

  afterAll(async () => {
    await client.$transaction([
      client.contact.deleteMany(),
      client.member.deleteMany(),
      client.wallet.deleteMany(),
      client.location.deleteMany(),
      client.member.deleteMany(),
    ])
    await client.$disconnect()
    await postgresContainer.stop();
  })

  describe('Save', () => {
    beforeEach(async () => {
      await client.$transaction([
        client.member.deleteMany(),
        client.contact.deleteMany(),
        client.member.deleteMany(),
        client.wallet.deleteMany(),
        client.location.deleteMany(),
      ])
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

      // expect(createLocationMock).toHaveBeenCalled()
      // expect(createLocationMock).toHaveBeenCalledWith({ data: { ...location, member: { connect: { id: '1' } } } })
    })

    it('should call settings.create with correct value', async () => {
      const sut = new PgMemberRepository()
      const { wallet, location, settings, contact, ...rest } = createMemberData
      await sut.create(createMemberData, client)
      const deliveryDays = []
      if (settings.delivery_day_1) deliveryDays.push('mon')
      if (settings.delivery_day_2) deliveryDays.push('tue')
      if (settings.delivery_day_3) deliveryDays.push('wed')
      if (settings.delivery_day_4) deliveryDays.push('thu')
      if (settings.delivery_day_5) deliveryDays.push('fri')
      if (settings.delivery_day_6) deliveryDays.push('sat')
      if (settings.delivery_day_7) deliveryDays.push('sun')
      const settingsHandled = {
        can_deliver : settings.can_deliver,
        delivery_day : deliveryDays,
        push_asked : settings.push_asked,
        marketing_email : settings.transac_marketing_notifications.marketing.email,
        marketing_push : settings.transac_marketing_notifications.marketing.push,
        marketing_sms : settings.transac_marketing_notifications.marketing.sms,
        transactional_email : settings.transac_marketing_notifications.transactional.email,
        transactional_push : settings.transac_marketing_notifications.transactional.push,
        transactional_sms : settings.transac_marketing_notifications.transactional.sms
      }
      // expect(createSettingsMock).toHaveBeenCalled()
      // expect(createSettingsMock).toHaveBeenCalledWith({ data: { ...settingsHandled, member: { connect: { id: '1' } } } })
    })

    it('should call wallet.create with correct value', async () => {
      const sut = new PgMemberRepository()
      const { wallet, location, settings, contact, ...rest } = createMemberData
      await sut.create(createMemberData, client)

      // expect(createWalletMock).toHaveBeenCalled()
      // expect(createWalletMock).toHaveBeenCalledWith({ data: { ...wallet, member: { connect: { id: '1' } } } })
    })

    it('should call shop.create with correct value if is a shop custumer', async () => {
      const sut = new PgMemberRepository()
      const { wallet, location, settings, contact, ...rest } = createMemberData
      await sut.create(createMemberData, client)

      // expect(createShopMock).toHaveBeenCalled()
      // expect(createShopMock).toHaveBeenCalledWith({ data: { member: { connect: { id: '1' } } } })
    })

    it('should not call shop.create with correct value if is not a shop', async () => {
      const sut = new PgMemberRepository()
      const { ...withoutShop } = createMemberData

      await sut.create(withoutShop, client)

      // expect(createShopMock).not.toHaveBeenCalled()
    })

    it('should returns the same value received from prisma', async () => {
    //  createMemberMock.mockResolvedValueOnce({ ...rest, created_at: '2024', updated_at: '2024', id: '1' })

      const sut = new PgMemberRepository()
      const data = await sut.create(createMemberData, client)
      expect(data).toMatchObject({ ...rest, id: '1' })
    })

    it('should rethrow if prisma throws', async () => {
   //   createMemberMock.mockRejectedValueOnce(new Error(''))
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