import { PgMemberRepository } from '@/infra/repository/pg-member-repository'
import { makeFakeMember } from '../../../tests/stubs/make-member-stub'
import timekeeper from 'timekeeper';
import sm from '@adamsfoodservice/shared-modules'

const createMock = jest.fn()
const findUniqueMock = jest.fn()
const updateMock = jest.fn()

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: function () {
      return {
        members: {
          create: (data: any) => createMock(data),
          findUnique: (data: any) => findUniqueMock(data),
          update: (data: any) => updateMock(data)
        }
      }
    }
  }
})
describe('PgMemberRepository', () => {
  let createMemberData: any
  const { created_at, updated_at, ...rest } = makeFakeMember()
  beforeAll(() => {
    timekeeper.freeze('2024-08-05T11:47:36')
    findUniqueMock.mockClear()
    createMock.mockResolvedValue({ ...createMemberData, id: '1' })
  })

  beforeEach(() => {
    createMemberData = makeFakeMember()
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



    it('should call create with correct value', async () => {
      const sut = new PgMemberRepository()

      await sut.create(createMemberData)

      expect(createMock).toHaveBeenCalled()
      expect(createMock).toHaveBeenCalledWith({ data: createMemberData })
    })

    it('should returns the same value received from prisma', async () => {
      createMock.mockResolvedValueOnce({ ...rest, created_at: '2024', updated_at: '2024', id: '1' })

      const sut = new PgMemberRepository()
      const data = await sut.create(createMemberData)
      expect(data).toMatchObject({ ...rest, id: '1' })
    })

    it('should rethrow if prisma throws', async () => {
      createMock.mockRejectedValueOnce(new Error(''))
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