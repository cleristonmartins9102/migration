import { SerializeErrors, Validation } from '@/application/contract/validation'
import timekeeper from 'timekeeper'
import sm from '@adamsfoodservice/shared-modules'
import { CreateMemberRepository } from '@/data/domain/features/create-member-repository'
import { CreateMemberController } from '@/application/controller'
import { badRequest, created } from '@/application/helpers/http'
import { makeFakeMember } from '../../../tests/stubs'
import { MemberAlreadyExistsError } from '@/application/errors'
import { mock, MockProxy } from 'vitest-mock-extended'


  describe('Create Member Controller', () => {  
  const memberFakeData = makeFakeMember()
  let formatMemberDataService: any
  let pgDeliveryRepoDefaultResponse: any
  const httpRequest: any = {
    body: memberFakeData
  }
  let pgMemberRepository: MockProxy<CreateMemberRepository>
  let sut: CreateMemberController
  const validatorMock = mock<Validation & SerializeErrors>()
  let controllerBuildValidatorSpy: any

  beforeAll(() => {
    timekeeper.freeze('2024-07-15 00:00:00')
    pgDeliveryRepoDefaultResponse = { ...memberFakeData, id: '1', created_at: new sm.DateTime.MomentAdapter(), updated_at: new sm.DateTime.MomentAdapter() }
    pgMemberRepository = mock()
    formatMemberDataService = vi.fn()
    formatMemberDataService.mockReturnValue({ formatedData: 'anydata' })
    sut = new CreateMemberController(pgMemberRepository, formatMemberDataService)
    controllerBuildValidatorSpy = vi.spyOn(sut, 'buildValidator')
    validatorMock.validate.mockResolvedValue(null)
    controllerBuildValidatorSpy.mockReturnValue(validatorMock)
    pgMemberRepository.create.mockResolvedValue({ ...memberFakeData, id: '1', created_at: new sm.DateTime.MomentAdapter(), updated_at: new sm.DateTime.MomentAdapter() })
  })

  beforeEach(() => {
    pgMemberRepository.create.mockClear()
  })

  describe('format data', () => {
    it('should call formatMemberData with correct value', async () => {
      await sut.perform(httpRequest)

      expect(formatMemberDataService).toHaveBeenCalled()
      expect(formatMemberDataService).toHaveBeenCalledWith(httpRequest.body)
    })
  })

  describe('pgMemberRepository', () => {
    it('Should call pgMemberRepository with correct value', async () => {
      await sut.perform(httpRequest)

      expect(pgMemberRepository.create).toHaveBeenCalled()
      expect(pgMemberRepository.create).toHaveBeenCalledWith({ formatedData: 'anydata' })
    })

    it('Should returns 400 if pgMemberRepository throws MemberAlreadyExistsError', async () => {
      pgMemberRepository.create.mockRejectedValueOnce(new MemberAlreadyExistsError('1'))
       expect(await sut.perform(httpRequest)).toEqual(badRequest({ error: new MemberAlreadyExistsError('1').message }))
    })

    it('Should rethrow if pgMemberRepository throw ', async () => {
      pgMemberRepository.create.mockRejectedValueOnce(new Error('database error'))

      await expect(sut.perform(httpRequest)).rejects.toThrow('database error')
    })
  })

  it('Should return 200 on success with the same value received from pgMemberRepository ', async () => {
    const controllerResponse = await sut.perform(httpRequest)
    expect(controllerResponse).toMatchObject(created(pgDeliveryRepoDefaultResponse))
  })
})
