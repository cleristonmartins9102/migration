import { UpdateMember, UpdateMemberModel } from '@/data/domain/features/update/update-member';
import { Controller, HttpRequest, HttpResponse } from '@/application/contract';
import { RecordNotFoundError } from '@/application/errors';
import { badRequest, notFound, ok } from '@/application/helpers/http';
import { RequiredParameterValidator } from '@/validator';
import { AllowedContentTypesValidator } from '@/validator/allowed-content-types-validator';
import { ContentTypes } from '@/application/enum/content-types-enum';
import { storage } from '@/application/storage/storage';
import sm from '@adamsfoodservice/shared-modules';

/**
 * The `UpdateMemberController` class is responsible for handling HTTP requests
 * to update member information. It extends a base `Controller` class and utilizes
 * the `UpdateMemberWithFlexibleParams` service to perform the update operation.
 * 
 * This controller supports two types of content:
 * - `JSON` or `x-www-form-urlencoded`: Handles updates from system or user inputs.
 * 
 * The class validates the incoming request, processes the data accordingly,
 * and returns an appropriate HTTP response.
 * 
 * @param dbUpdateMember - An instance of `UpdateMemberWithFlexibleParams` responsible
 * for updating the member data in the database.
 * 
 * @method perform - The main method that processes the HTTP request, performs the update,
 * and returns the corresponding HTTP response.
 */
type InputBody = UpdateMemberModel & { file: string }

export class UpdateMemberController extends Controller<any, any> {
  constructor(private readonly updateMemberUseCase: UpdateMember) {
    super();
  }

  /**
   * Handles the HTTP request to update a member's information.
   * 
   * The method first validates the content type of the request and then processes the request body
   * depending on whether it comes from a system (via URL-encoded data) or a user (via JSON data).
   * 
   * - If the request is URL-encoded, it expects a file to be uploaded, translates the file data to
   *   the API model, and performs the update.
   * - If the request is JSON, it updates the member data directly using the provided `internal_id`
   *   or `user_account_id`.
   * 
   * @param httpRequest - The incoming HTTP request containing the member data to be updated.
   * @returns A promise that resolves to an HTTP response indicating the result of the operation.
   */
  async perform(httpRequest: HttpRequest<InputBody, any>): Promise<HttpResponse<any>> {
    const { body, contentType } = httpRequest;
    
    // Validate that the request body is present
    if (!body) return badRequest('body');
    
    try {
      // Validate the content type of the request
      const validator = new AllowedContentTypesValidator([ContentTypes.Json, ContentTypes.Urlencoded]);
      const error = await validator.validate(contentType as string);
      if (error) return badRequest(error.message);
      
      // Handle updates from the system (URL-encoded)
      if (contentType === ContentTypes.Urlencoded) {
        const validator = new RequiredParameterValidator('file');
        const error = await validator.validate(body);
        if (error) return badRequest(error);
        
        // Translate ERP data to API model
        const { translatedData } = sm.Translate.translateErpDataToApiModel().translate(body.file);
        if (translatedData.length === 0) return ok(false);
        
        // Perform the update using the translated data
        return ok(await this.updateMemberUseCase.update(translatedData[0] as any));
      
      // Handle updates from the user (JSON)
      } else {
        if (!body.internal_id) {
          body.user_account_id = (storage.currentUser.get() as any).id;
        }
        
        // Perform the update using the provided data
        return ok(await this.updateMemberUseCase.update(body as UpdateMemberModel));
      }
      
    } catch (error) {
      // Handle not found errors specifically
      if (error instanceof RecordNotFoundError) {
        return notFound(error.message);
      }
      
      // Re-throw other errors
      throw error;
    }
  }
}
