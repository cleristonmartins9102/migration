import { PgMemberRepository } from '@/infra/repository/pg-member-repository'
import { makeFakeMember } from '../../../tests/stubs/make-member-stub'
import timekeeper from 'timekeeper';
import sm from '@adamsfoodservice/shared-modules'

const createMock = jest.fn()
const findUniqueMock = jest.fn()
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: function () {
      return {
        members: {
          create: (data: any) => createMock(data),
          findUnique: (data: any) => findUniqueMock(data)
        }
      }
    }
  }
})
describe('PgMemberRepository', () => {
  let createMemberData: any

  beforeAll(() => {
    timekeeper.freeze('2024-08-05T11:47:36')
   
  })

  beforeEach(() => {
    createMemberData = makeFakeMember()
    createMock.mockResolvedValue({ ...createMemberData, id: '1' })
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
      const sut = new PgMemberRepository()

      expect(await sut.create(createMemberData)).toEqual({ ...createMemberData, id: '1' })
    })

    it('should rethrow if prisma throws', async () => {
      createMock.mockRejectedValueOnce(new Error(''))
      const sut = new PgMemberRepository()

      await expect(sut.create(createMemberData)).rejects.toThrow()
    })
  })
})