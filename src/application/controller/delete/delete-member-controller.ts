import { Controller, HttpRequest, HttpResponse } from '@/application/contract';
import { RecordNotFoundError } from '@/application/errors';
import { notFound, ok } from '@/application/helpers/http';
import { DeleteMember } from '@/data/domain/features/delete/delete-member';

type Input = {
  id?: string
  internal_id?: string
}

/**
 * The `DeleteMemberController` class is responsible for handling HTTP requests
 * to delete a member's information. It extends a base `Controller` class and 
 * utilizes the `DeleteMember` use case to perform the deletion operation.
 * 
 * This controller expects an `internal_id` or `id` in the request body to identify 
 * the member to be deleted. If the member is successfully deleted, it returns an 
 * HTTP 200 response with the result of the operation.
 * 
 * If the member cannot be found based on the provided identifier, it catches the 
 * `RecordNotFoundError` and returns an HTTP 404 response with an appropriate error message.
 * 
 * @param deleteMember - An instance of the `DeleteMember` use case, which contains 
 * the logic for deleting a member's information from the database.
 * 
 * @method perform - The main method that processes the HTTP request, performs the 
 * delete operation, and returns the corresponding HTTP response.
 */
export class DeleteMemberController extends Controller<any, any> {
  constructor(private readonly deleteMember: DeleteMember) {
    super();
  }

  /**
   * Handles the HTTP request to delete a member's information.
   * 
   * The method attempts to delete the member identified by the `internal_id` or `id`
   * provided in the request body. If successful, it returns an HTTP 200 response with
   * the result of the deletion.
   * 
   * If the member is not found, it catches the `RecordNotFoundError` and returns an 
   * HTTP 404 response.
   * 
   * @param httpRequest - The incoming HTTP request containing the identifier of the 
   * member to be deleted.
   * @returns A promise that resolves to an HTTP response indicating the result of the operation.
   */
  async perform(httpRequest: HttpRequest<Input, Input>): Promise<HttpResponse<any>> {
    const { body } = httpRequest;
    try {
      // Attempt to delete the member using the provided internal_id
      const dbDeleteResponse = await this.deleteMember.delete({ internal_id: body?.internal_id });
      return ok(dbDeleteResponse);
    } catch (error) {
      // Return a 404 response if the member is not found
      if (error instanceof RecordNotFoundError) return notFound(error.message);
      throw error;
    }
  }
}
