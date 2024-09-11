import { mock, MockProxy } from 'vitest-mock-extended'
import timekeeper from 'timekeeper'
import { LoadByIdRepository, UpdateMemberRepository } from '@/data/domain/features'
import { makeFakeMember, makeFakeMemberModelStub } from '../../tests/stubs'
import { MemberModel } from '@adamsfoodservice/core-models'
import { RecordNotFoundError } from '@/application/errors'
import { DbUpdateMember } from '@/data/features'


describe('Db Update Delivery', () => {
  let pgMemberRepo: MockProxy<UpdateMemberRepository & LoadByIdRepository>
  let sut: DbUpdateMember
  let memberFakeData: MemberModel
  beforeAll(() => {
    memberFakeData = makeFakeMemberModelStub()

    timekeeper.freeze('2024-07-15 00:00:00')
    pgMemberRepo = mock()
    pgMemberRepo.loadById.mockResolvedValue(memberFakeData)
    sut = new DbUpdateMember(pgMemberRepo)
  })

  it('should call findByOrderId with correct value', async () => {
    pgMemberRepo.update.mockResolvedValueOnce(true)
    await sut.update(memberFakeData)

    expect(pgMemberRepo.loadById).toHaveBeenCalled()
    expect(pgMemberRepo.loadById).toHaveBeenCalledWith(memberFakeData.id)
  })

  it('should return RecordNotFoundError if findByOrderId returns null', async () => {
    pgMemberRepo.loadById.mockResolvedValueOnce(null)
    await expect(sut.update(memberFakeData)).rejects.toThrow()
  })

  it('should call update with correct value', async () => {
    pgMemberRepo.update.mockResolvedValueOnce(true)
    await sut.update({ id: memberFakeData.id, role: 'updated_role' })
    expect(pgMemberRepo.update).toHaveBeenCalled()
    expect(pgMemberRepo.update).toHaveBeenCalledWith({ ...memberFakeData, role: 'updated_role' })
  })

  it('should not call with not allowed updated fields', async () => {
    pgMemberRepo.update.mockResolvedValueOnce(true)
    await sut.update({ id: memberFakeData.id, internal_id: 'updated_internalid', role: 'updated_role' })
    expect(pgMemberRepo.update).toHaveBeenCalled()
    expect(pgMemberRepo.update.mock.calls[0][0].internal_id).toBe(memberFakeData.internal_id)
  })


  it('should return true on success', async () => {
    pgMemberRepo.update.mockResolvedValueOnce(true)
    const response = await sut.update(memberFakeData)
    expect(response).toBe(true)
  })
})
