import { Router } from 'express';
import { expressAdapter } from '../../adapters';
import { acceptMemberControllerFactory } from '@/main/factories/controller';
import { Middleware } from '@adamsfoodservice/shared-middleware';
import path from 'path'
import { storage } from '@/application/storage/storage';

/**
 * @swagger
 * /api/member/v1/accept:
 *   post:
 *     tags: [Member]
 *     summary: Accept a member by ID
 *     description: Accepts a member based on their internal identifier.
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
 *                 description: Internal identifier of the member
 *               internal_id:
 *                 type: string
 *                 description: Internal identifier of the member
 *             required:
 *               - internal_id
 *     responses:
 *       200:
 *         description: A boolean indicating if the member was successfully accepted.
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *       400:
 *         description: Bad request, invalid input.
 *       404:
 *         description: Member not found.
 *       500:
 *         description: Internal server error.
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

export const acceptMemberRouter = (router: Router): void => {
  const authMiddleware = Middleware.userAuth(path.join(__dirname, '../../../../credentials.json'), storage.currentUser)
  router.post('/accept', authMiddleware, expressAdapter(acceptMemberControllerFactory()))
}