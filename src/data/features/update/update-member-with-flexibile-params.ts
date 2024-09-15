import { PrismaError, RecordNotFoundError } from '@/application/errors'
import { LoadByInternalIdRepository, LoadByUserAccountIdRepository, UpdateMember, UpdateMemberModel, UpdateMemberRepository } from '@/data/domain/features'
import { MemberUpdatePayload } from '@/data/models/logical'
import { Prisma } from '@prisma/client'
/**
 * The `UpdateMemberWithFlexibleParams` class implements the `UpdateMember` interface,
 * providing a flexible way to update member data based on different identification parameters.
 * 
 * This class is designed to handle scenarios where a member can be identified by either a 
 * `user_account_id` or an `internal_id`. It abstracts the logic for fetching the member data 
 * from the database, updating it, and returning a result that indicates which fields were updated.
 * 
 * @param pgMemberRepository - A repository instance that handles database operations for members.
 * This repository should implement the following interfaces:
 *  - `LoadByUserAccountIdRepository`: To load a member by `user_account_id`.
 *  - `LoadByInternalIdRepository`: To load a member by `internal_id`.
 *  - `UpdateMemberRepository`: To update the member data in the database.
 * 
 * @method update - The main method that performs the update operation. It first attempts to load
 * the member by `user_account_id` or `internal_id`. If the member is found, it updates the member 
 * with the provided data and returns a result indicating which fields were updated.
 * 
 * @throws RecordNotFoundError - If no member is found for the provided `user_account_id` or `internal_id`.
 * 
 * @returns `UpdateMember.UpdateResult` - An object indicating the fields that were successfully updated.
 */
export class UpdateMemberWithFlexibleParams implements UpdateMember {
  constructor(
    private readonly pgMemberRepository: LoadByUserAccountIdRepository & LoadByInternalIdRepository & UpdateMemberRepository
  ) {}

  /**
   * Updates a member's information based on the provided `updateMemberData`.
   * 
   * The method first checks if the member can be identified by `user_account_id` or `internal_id`.
   * If the member is found, it updates the relevant fields and persists the changes to the database.
   * 
   * @param updateMemberData - The data containing the fields to be updated.
   * @returns An object containing the status of each field that was updated.
   */
  async update(updateMemberData: UpdateMemberModel): Promise<any> {
    let member: any
    let paramName = ''
    let paramValue = ''
    
    try {

      // Check if member is identified by user_account_id
      if (updateMemberData.user_account_id) {
        member = await this.pgMemberRepository.loadByUserAccountId(updateMemberData.user_account_id)
        paramName = 'id'
        paramValue = updateMemberData.id
      
      // Check if member is identified by internal_id
      } else if (updateMemberData.internal_id) {
        member = await this.pgMemberRepository.loadByInternalId(updateMemberData.internal_id)
        paramName = 'internal_id'
        paramValue = updateMemberData.internal_id
      }
  
      // If no member is found, throw an error
      if (!member) {
        throw new RecordNotFoundError('member', paramName, paramValue)
      }
  
      // Create a new MemberUpdatePayload with the updated data
      const updatedMemberModel = new MemberUpdatePayload(member, updateMemberData)
  
      // Update the member in the repository

      await this.pgMemberRepository.update(updatedMemberModel)
      
      // Return the fields that were updated
      return updatedMemberModel.getUpdatedFields()
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(`Prisma Client Known Request Error: ${error.message}`);
        throw new PrismaError(new Error('internal error'))
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        console.error(`Prisma Client Unknown Request Error: ${error.message}`);
        throw new PrismaError(new Error('internal error'))
      } else if (error instanceof Prisma.PrismaClientRustPanicError) {
        console.error(`Prisma Client Rust Panic Error: ${error.message}`);
        throw new PrismaError(new Error('internal error'))
      } else if (error instanceof Prisma.PrismaClientInitializationError) {
        console.error(`Prisma Client Initialization Error: ${error.message}`);
        throw new PrismaError(new Error('internal error'))
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        console.error(`Prisma Client Validation Error: ${error.message}`);
        throw new PrismaError(new Error('internal error'))
      } else {
        if (error instanceof Error)
        throw new PrismaError(error)
      }
    }
  }
}

export namespace UpdateMemberWithFlexibleParams {
  export type Params = {
    internal_id?: string
    id?: string
    accounts?: string
  }
}