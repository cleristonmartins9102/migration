import mock, { MockProxy } from 'jest-mock-extended/lib/Mock'
import { SerializeErrors, Validation } from '@/application/contract/validation'
import { notFound } from '@/application/helpers/http'
import { RecordNotFoundError } from '@/application/errors'
import { UpdateMember } from '@/data/domain/features/update/update-member'
import { makeFakeMember } from '../../stubs'
import { LoadMemberByInternalIdController, UpdateMemberController } from '@/application/controller'
import { LoadByInternalIdRepository } from '@/data/domain/features'
import { MemberModel } from '@adamsfoodservice/core-models'

describe('Load Member By internal_id', () => {
  let pgMemberRepository: MockProxy<LoadByInternalIdRepository>
  const httpRequest = {
    params: { id: '1' }
  }
  let sut: LoadMemberByInternalIdController
  const validatorMock = mock<Validation & SerializeErrors>()
  let controllerBuildValidatorSpy: any
  let pgMemberRepositoryResponse: MemberModel
  beforeAll(() => {
    pgMemberRepositoryResponse = makeFakeMember()
    pgMemberRepository = mock()
    pgMemberRepository.loadByInternalId.mockResolvedValue(pgMemberRepositoryResponse)
    sut = new LoadMemberByInternalIdController(pgMemberRepository)
    controllerBuildValidatorSpy = jest.spyOn(sut, 'buildValidator')
    validatorMock.validate.mockResolvedValue(null)
    controllerBuildValidatorSpy.mockReturnValue(validatorMock)
  })

  beforeEach(() => {
    pgMemberRepository.loadByInternalId.mockClear()
  })

  describe('PgMemberRepository', () => {
    it('Should call loadByInternalId with correct value', async () => {
      await sut.perform(httpRequest)

      expect(pgMemberRepository.loadByInternalId).toHaveBeenCalled()
      expect(pgMemberRepository.loadByInternalId).toHaveBeenCalledWith(httpRequest.params.id)
    })


    it('Should rethrow if DbUpdateMember throws ', async () => {
      pgMemberRepository.loadByInternalId.mockRejectedValueOnce(new Error('database error'))

      await expect(sut.perform(httpRequest)).rejects.toThrow('database error')
    })
  })

  it('Should return 200 on success with the same value received from PgDeliveryRepository ', async () => {
    const controllerResponse = await sut.perform(httpRequest)

    expect(controllerResponse).toEqual({
      statusCode: 200,
      body: pgMemberRepositoryResponse
    })
  })
})
