import { Router } from 'express'
import { expressAdapter } from '@/main/adapters'
import path from 'path'
import { storage } from '@/application/storage/storage'
import { Middleware } from '@adamsfoodservice/shared-middleware'
import { updateMemberNotificationDecoratorControllerFactory } from '@/main/factories/controller'

/**
 * @swagger
 * /api/member/v1/update:
 *   post:
 *     tags: [Member]
 *     summary: Update a member's information
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Internal identifier of the member (Required for JSON requests)
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               customer_type:
 *                 type: string
 *               branch_id:
 *                 type: string
 *               shop_address:
 *                 type: string
 *               shop_name:
 *                 type: string
 *               postcode:
 *                 type: string
 *               push:
 *                 type: boolean
 *               sms:
 *                 type: boolean
 *               email:
 *                 type: boolean
 *               push_marketing:
 *                 type: boolean
 *               email_marketing:
 *                 type: boolean
 *               sms_marketing:
 *                 type: boolean
 *               town:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               internal_id:
 *                 type: string
 *                 description: Internal identifier of the member (Required if user_account_id is not provided)
 *               user_account_id:
 *                 type: string
 *                 description: User account identifier of the member (Auto-filled if not provided)
 *             required:
 *               - id
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File containing member data (Required for URL-encoded requests)
 *             required:
 *               - file
 *     responses:
 *       200:
 *         description: Member successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/memberResponseSchema'
 *       400:
 *         description: Bad request, invalid input.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Member not found.
 *       500:
 *         description: Internal server error.
 * 
 * components:
 *   schemas:
 *     memberResponseSchema:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         user_account_id:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         customer_type:
 *           type: string
 *         disabled:
 *           type: boolean
 *         email_verified:
 *           type: boolean
 *         internal_id:
 *           type: string
 *         invoiced_by:
 *           type: string
 *         role:
 *           type: string
 *         branch:
 *           type: object
 *           properties:
 *             internal_id:
 *               type: string
 *             name:
 *               type: string
 *         payroll_number:
 *           type: integer
 *         wallet:
 *           type: object
 *           properties:
 *             balance:
 *               type: integer
 *         location:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *             postcode:
 *               type: string
 *             city:
 *               type: string
 *             number:
 *               type: string
 *         settings:
 *           type: object
 *           properties:
 *             can_deliver:
 *               type: boolean
 *             push_asked:
 *               type: boolean
 *             transac_marketing_notifications:
 *               type: object
 *               properties:
 *                 marketing:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: boolean
 *                     push:
 *                       type: boolean
 *                     sms:
 *                       type: boolean
 *                 transactional:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: boolean
 *                     push:
 *                       type: boolean
 *                     sms:
 *                       type: boolean
 *         contact:
 *           type: object
 *           properties:
 *             phone_number:
 *               type: string
 *             email:
 *               type: string
 *         web_parent:
 *           type: integer
 *         updated_at:
 *           type: string
 *           format: date-time
 *         created_at:
 *           type: string
 *           format: date-time
 */
export const updateMemberRouter = (router: Router): void => {
  const authMiddleware = Middleware.userAuth(path.join(__dirname, '../../../../credentials.json'), storage.currentUser)
  router.post('/update', authMiddleware, expressAdapter(updateMemberNotificationDecoratorControllerFactory()))
}
