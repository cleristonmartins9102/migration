import { Router } from 'express';
import { expressAdapter } from '../../adapters';
import { rejectMemberControllerFactory } from '@/main/factories/controller';

/**
 * @swagger
 * /api/member/v1/reject:
 *   post:
 *     tags: [Member]
 *     summary: Reject a member
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the member to be rejected.
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: A boolean indicating if the member was successfully rejected.
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
export const rejectMemberRouter = (router: Router): void => {
  router.post('/reject', expressAdapter(rejectMemberControllerFactory()))
}