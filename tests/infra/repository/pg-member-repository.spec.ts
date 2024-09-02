import { PgMemberRepository } from '@/infra/repository/pg-member-repository'
import { makeFakeMember } from '../../../tests/stubs/make-member-stub'
import timekeeper from 'timekeeper';
import sm from '@adamsfoodservice/shared-modules'
import { MemberModel } from '@adamsfoodservice/core-models';
import { CreateMemberHouseHold, CreateMemberShop } from '@/data/domain/models';

const createMemberMock = vi.fn()
createMemberMock.mockResolvedValue({ id: 1 })
const createContactMock = vi.fn()
const createLocationMock = vi.fn()
const createWalletMock = vi.fn()
const createShopMock = vi.fn()
const createSettingsMock = vi.fn()
const findUniqueMock = vi.fn()
const updateMock = vi.fn()

vi.mock('@prisma/client', () => {
  return {
    PrismaClient: function () {
      return {
        member: {
          create: (data: any) => createMemberMock(data),
          findUnique: (data: any) => findUniqueMock(data),
          update: (data: any) => updateMock(data)
        },
        contact: {
          create: (data: any) => createContactMock(data),
          findUnique: (data: any) => findUniqueMock(data),
          update: (data: any) => updateMock(data)
        },
        location: {
          create: (data: any) => createLocationMock(data),
          findUnique: (data: any) => findUniqueMock(data),
          update: (data: any) => updateMock(data)
        },
        settings: {
          create: (data: any) => createSettingsMock(data),
          findUnique: (data: any) => findUniqueMock(data),
          update: (data: any) => updateMock(data)
        },
        wallet: {
          create: (data: any) => createWalletMock(data),
          findUnique: (data: any) => findUniqueMock(data),
          update: (data: any) => updateMock(data)
        }
      }
    }
  }
})
describe('PgMemberRepository', () => {
  let createMemberData: CreateMemberHouseHold | CreateMemberShop;
  const { ...rest } = makeFakeMember()
  beforeAll(() => {
    timekeeper.freeze('2024-08-05T11:47:36')
    findUniqueMock.mockClear()
    createMemberMock.mockResolvedValue({ ...createMemberData, id: '1' })
  })

  beforeEach(() => {
    createMemberData = makeFakeMember()
    createMemberMock.mockClear()
    createContactMock.mockClear()
    createLocationMock.mockClear()
    createSettingsMock.mockClear()
    createWalletMock.mockClear()
    createShopMock.mockClear()
  })

  describe('Save', () => {
    it('should call findUnique with correct value', async () => {
      const sut = new PgMemberRepository()

      await sut.create(createMemberData)

      expect(findUniqueMock).toHaveBeenCalled()
      expect(findUniqueMock).toHaveBeenCalledWith({ where: { user_account_id: createMemberData.user_account_id } })
    })

    it('should throw MemberAlreadyExistsError if user with user_account_id exists', async () => {
      findUniqueMock.mockResolvedValueOnce({ member: 1 })

      const sut = new PgMemberRepository()

      await expect(sut.create(createMemberData)).rejects.toThrow()
    })



    it('should call member.create with correct value', async () => {
      const sut = new PgMemberRepository()
      const { wallet, location, settings, contact, ...rest } = createMemberData
      await sut.create(createMemberData)

      expect(createMemberMock).toHaveBeenCalled()
      expect(createMemberMock).toHaveBeenCalledWith({ data: rest })
    })

    it('should call contact.create with correct value', async () => {
      const sut = new PgMemberRepository()
      const { wallet, location, settings, contact, ...rest } = createMemberData
      await sut.create(createMemberData)

      expect(createContactMock).toHaveBeenCalled()
      expect(createContactMock).toHaveBeenCalledWith({ data: { ...contact, member: { connect: { id: '1' } } } })
    })

    it('should call address.create with correct value', async () => {
      const sut = new PgMemberRepository()
      const { wallet, location, settings, contact, ...rest } = createMemberData
      await sut.create(createMemberData)

      expect(createLocationMock).toHaveBeenCalled()
      expect(createLocationMock).toHaveBeenCalledWith({ data: { ...location, member: { connect: { id: '1' } } } })
    })

    it('should call settings.create with correct value', async () => {
      const sut = new PgMemberRepository()
      const { wallet, location, settings, contact, ...rest } = createMemberData
      await sut.create(createMemberData)
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
      expect(createSettingsMock).toHaveBeenCalled()
      expect(createSettingsMock).toHaveBeenCalledWith({ data: { ...settingsHandled, member: { connect: { id: '1' } } } })
    })

    it('should call wallet.create with correct value', async () => {
      const sut = new PgMemberRepository()
      const { wallet, location, settings, contact, ...rest } = createMemberData
      await sut.create(createMemberData)

      expect(createWalletMock).toHaveBeenCalled()
      expect(createWalletMock).toHaveBeenCalledWith({ data: { ...wallet, member: { connect: { id: '1' } } } })
    })

    it('should call shop.create with correct value if is a shop custumer', async () => {
      const sut = new PgMemberRepository()
      const { wallet, location, settings, contact, ...rest } = createMemberData
      await sut.create(createMemberData)

      expect(createShopMock).toHaveBeenCalled()
      expect(createShopMock).toHaveBeenCalledWith({ data: { member: { connect: { id: '1' } } } })
    })

    it('should not call shop.create with correct value if is not a shop', async () => {
      const sut = new PgMemberRepository()
      const { ...withoutShop } = createMemberData

      await sut.create(withoutShop)

      expect(createShopMock).not.toHaveBeenCalled()
    })

    it('should returns the same value received from prisma', async () => {
      createMemberMock.mockResolvedValueOnce({ ...rest, created_at: '2024', updated_at: '2024', id: '1' })

      const sut = new PgMemberRepository()
      const data = await sut.create(createMemberData)
      expect(data).toMatchObject({ ...rest, id: '1' })
    })

    it('should rethrow if prisma throws', async () => {
      createMemberMock.mockRejectedValueOnce(new Error(''))
      const sut = new PgMemberRepository()

      await expect(sut.create(createMemberData)).rejects.toThrow()
    })
  })

  describe('LoadById', () => {
    it('should call findUnique with correct value', async () => {
      const sut = new PgMemberRepository()

      await sut.loadById('2')

      expect(findUniqueMock).toHaveBeenCalled()
      expect(findUniqueMock).toHaveBeenCalledWith({ where: { id: 2 } })
    })
  })

  describe('Update', () => {
    it('should call update with correct value', async () => {
      findUniqueMock.mockResolvedValueOnce({ id: 2, role: 'dev' })
      const sut = new PgMemberRepository()

      await sut.update({ id: '2', role: 'new role' })

      expect(updateMock).toHaveBeenCalled()
      expect(updateMock).toHaveBeenCalledWith({ where: { id: 2 }, data: { role: 'new role' } })
    })
  })
})