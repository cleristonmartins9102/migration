import mock, { MockProxy } from 'jest-mock-extended/lib/Mock'
import { SerializeErrors, Validation } from '@/application/contract/validation'
import { notFound } from '@/application/helpers/http'
import { RecordNotFoundError } from '@/application/errors'
import { UpdateMember } from '@/data/domain/features/update-member'
import { makeFakeMember } from '../../../tests/stubs'
import { UpdateMemberController } from '@/application/controller'

describe('Update Delivery Controller', () => {
  const memberFakeData = makeFakeMember()
  const httpRequest = {
    body: memberFakeData
  }
  let dbUpdateMember: MockProxy<UpdateMember>
  let sut: UpdateMemberController
  const validatorMock = mock<Validation & SerializeErrors>()
  let controllerBuildValidatorSpy: any

  beforeAll(() => {
    dbUpdateMember = mock()
    sut = new UpdateMemberController(dbUpdateMember)
    controllerBuildValidatorSpy = jest.spyOn(sut, 'buildValidator')
    validatorMock.validate.mockResolvedValue(null)
    controllerBuildValidatorSpy.mockReturnValue(validatorMock)
    dbUpdateMember.update.mockResolvedValue(true)
  })

  beforeEach(() => {
    dbUpdateMember.update.mockClear()
  })

  describe('DbUpdateMember', () => {
    it('Should call update with correct value', async () => {
      await sut.perform(httpRequest)

      expect(dbUpdateMember.update).toHaveBeenCalled()
      expect(dbUpdateMember.update).toHaveBeenCalledWith(memberFakeData)
    })

    it('Should return 404 if Db throws RecordNotFoundError', async () => {
      dbUpdateMember.update.mockRejectedValueOnce(new RecordNotFoundError('member', 'id', httpRequest.body.internal_id))

      const controllerResponse = await sut.perform(httpRequest)

      expect(controllerResponse).toEqual(notFound(new RecordNotFoundError('member', 'id', httpRequest.body.internal_id).message))
    })

    it('Should rethrow if DbUpdateMember throws ', async () => {
      dbUpdateMember.update.mockRejectedValueOnce(new Error('database error'))

      await expect(sut.perform(httpRequest)).rejects.toThrow('database error')
    })
  })

  it('Should return 200 on success with the same value received from PgDeliveryRepository ', async () => {
    const controllerResponse = await sut.perform(httpRequest)

    expect(controllerResponse).toEqual({
      statusCode: 200,
      body: true
    })
  })
})