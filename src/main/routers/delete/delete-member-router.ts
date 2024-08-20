import { storage } from '@/application/storage/storage';
import { expressAdapter } from '@/main/adapters';
import { deleteMemberControllerFactory } from '@/main/factories/controller';
import { Middleware } from '@adamsfoodservice/shared-middleware';
import { Router } from 'express';
import path from 'path'
/**
 * @swagger
 * /api/member/v1/:
 *   delete:
 *     tags: [Member]
 *     summary: Delete a member
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               internal_id:
 *                 type: string
 *                 description: Internal identifier of the member
 *             required:
 *               - internal_id
 *     responses:
 *       200:
 *         description: A boolean indicating if the member was successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
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
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

export const deleteMemberRouter = (router: Router): void => {
  const authMiddleware = Middleware.userAuth(path.join(__dirname, '../../../../credentials.json'), storage.currentUser)
  router.delete('/', authMiddleware, expressAdapter(deleteMemberControllerFactory()))
}