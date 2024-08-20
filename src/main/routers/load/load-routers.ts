import { loadAllMemberControllerFactory, loadUserWalletControllerFactory, loadMemberByPhoneNumberControllerFactory, loadMembersByInternalIdBatchControllerFactory, loadMemberByInternalIdControllerFactory } from '@/main/factories/controller'
import { Router } from 'express'
import path from 'path'
import { storage } from '@/application/storage/storage'
import { expressAdapter } from '@/main/adapters'
import { Middleware } from '@adamsfoodservice/shared-middleware'

/**
 * @swagger
 * /api/member/v1/load:
 *   get:
 *     tags: [Member]
 *     summary: Load all members
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all members.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 * 
 * /api/member/v1/load/internal-id-batch:
 *   post:
 *     tags: [Member]
 *     summary: Load members by a batch of internal IDs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               internal_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of internal identifiers of the members
 *             required:
 *               - internal_ids
 *     responses:
 *       200:
 *         description: A list of members with the provided internal IDs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Bad request, invalid input.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 * 
 * /api/member/v1/wallet/load/balance:
 *   get:
 *     tags: [Wallet]
 *     summary: Load the wallet balance for the current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The wallet balance of the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                   description: The current wallet balance.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 * 
 * /api/member/v1/load/phone-number/{phone_number}:
 *   get:
 *     tags: [Member]
 *     summary: Load a member by phone number
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: phone_number
 *         required: true
 *         schema:
 *           type: string
 *         description: The phone number of the member to load
 *     responses:
 *       200:
 *         description: The member with the specified phone number.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
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
export const loadRouters = (router: Router): void => {
  const authMiddleware = Middleware.userAuth(path.join(__dirname, '../../../../credentials.json'), storage.currentUser)
  router.get('/load', authMiddleware, expressAdapter(loadAllMemberControllerFactory()))
  router.post('/load/internal-id-batch', authMiddleware, expressAdapter(loadMembersByInternalIdBatchControllerFactory()))
  router.get('/wallet/load/balance', authMiddleware, expressAdapter(loadUserWalletControllerFactory()))
  // router.get('/load/internal_id/:id', authMiddleware, expressAdapter(loadMemberByInternalIdControllerFactory()))
  router.get('/load/phone-number/:phone_number', authMiddleware, expressAdapter(loadMemberByPhoneNumberControllerFactory()))
}
