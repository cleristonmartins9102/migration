import { RecordNotFoundError } from '@/application/errors';
import {
  LoadByInternalIdRepository,
  LoadByUserAccountIdRepository,
} from '@/data/domain/features';
import { DeleteMember } from '@/data/domain/features/delete/delete-member';
import { DeleteMemberRepository } from '@/data/domain/features/delete/delete-member-repository';

/**
 * The `DeleteMemberWithFlexibleParams` class implements the `DeleteMember` interface,
 * providing a flexible way to delete member data based on different identification parameters.
 * 
 * This class is designed to handle scenarios where a member can be identified by either a 
 * `userAccountId` or an `internal_id`. It abstracts the logic for fetching the member data 
 * from the database and deleting it.
 * 
 * @param pgMemberRepository - A repository instance that handles database operations for members.
 * This repository should implement the following interfaces:
 *  - `LoadByUserAccountIdRepository`: To load a member by `user_account_id`.
 *  - `LoadByInternalIdRepository`: To load a member by `internal_id`.
 *  - `DeleteMemberRepository`: To delete the member data from the database.
 * 
 * @method delete - The main method that performs the delete operation. It first attempts to load
 * the member by `userAccountId` or `internal_id`. If the member is found, it deletes the member 
 * from the database.
 * 
 * @throws RecordNotFoundError - If no member is found for the provided `userAccountId` or `internal_id`.
 * 
 * @returns `boolean` - Returns `true` if the member was successfully deleted.
 */
export class DeleteMemberWithFlexibleParams implements DeleteMember {
  constructor(
    private readonly pgMemberRepository: DeleteMemberRepository & LoadByInternalIdRepository & LoadByUserAccountIdRepository
  ) {}

  /**
   * Deletes a member's information based on the provided `inputData`.
   * 
   * The method first checks if the member can be identified by `userAccountId` or `internal_id`.
   * If the member is found, it deletes the member from the database.
   * 
   * @param inputData - The data containing the identification parameters for the member to be deleted.
   * @returns `boolean` - Returns `true` if the deletion was successful.
   */
  async delete(inputData: DeleteMember.InputData): Promise<boolean> {
    let member: any;
    let paramName = '';
    let paramValue = '';
    
    // Check if member is identified by user_account_id
    if (inputData.userAccountId) {
      member = await this.pgMemberRepository.loadByUserAccountId(inputData.userAccountId);
      paramName = 'id';
      paramValue = inputData.userAccountId;
    
    // Check if member is identified by internal_id
    } else if (inputData.internal_id) {
      member = await this.pgMemberRepository.loadByInternalId(inputData.internal_id);
      paramName = 'internal_id';
      paramValue = inputData.internal_id;
    }

    // If no member is found, throw an error
    if (!member) {
      throw new RecordNotFoundError('member', paramName, paramValue);
    }

    // Delete the member from the database
    await this.pgMemberRepository.delete(member.id);
    
    return true;
  }
}

/**
 * A namespace for the `UpdateMemberWithFlexibleParams` class.
 * 
 * It contains the type `Params`, which defines the parameters that can be used
 * to identify a member when performing an update operation.
 */
export namespace DeleteMemberWithFlexibleParams {
  export type Params = {
    internal_id?: string;
    id?: string;
    accounts?: string;
  };
}
