import { Router } from 'express';
import { expressAdapter } from '@/main/adapters';
import { updatePushSettingsControllerAdapterFactory, updateSmsSettingsControllerAdapterFactory, updateEmailSettingsControllerAdapterFactory, activatePushAskedSettingsControllerAdapterFactory } from '@/main/factories/controller';
import { Middleware } from '@adamsfoodservice/shared-middleware';
import path from 'path'
import { storage } from '@/application/storage/storage';
import { removeFcmTokenControllerFactory } from '@/main/factories/controller/update/settings/remove-fcm-token-controller-factory';
import { addFcmTokenControllerFactory } from '@/main/factories/controller/update/settings/add-fcm-token-controller-factory';
/**
 * @swagger
 * /api/member/v1/update-sms-notifications:
 *   post:
 *     tags: [Member Settings]
 *     summary: Update SMS notification settings for a member
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   flag:
 *                     type: boolean
 *                     description: Whether to enable or disable SMS notifications
 *                     example: true
 *                   type:
 *                     type: string
 *                     description: Type of SMS notification (e.g., "marketing", "transactional")
 *                     example: "transactional"
 *             required:
 *               - data
 *     responses:
 *       200:
 *         description: SMS notification settings successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: true
 *       400:
 *         description: Bad request, invalid input.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Member not found.
 *       500:
 *         description: Internal server error.
 *
 * /api/member/v1/update-push-notifications:
 *   post:
 *     tags: [Member Settings]
 *     summary: Update Push notification settings for a member
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   flag:
 *                     type: boolean
 *                     description: Whether to enable or disable Push notifications
 *                     example: true
 *                   type:
 *                     type: string
 *                     description: Type of Push notification (e.g., "marketing", "transactional")
 *                     example: "transactional"
 *             required:
 *               - data
 *     responses:
 *       200:
 *         description: Push notification settings successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: true
 *       400:
 *         description: Bad request, invalid input.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Member not found.
 *       500:
 *         description: Internal server error.
 *
 * /api/member/v1/update-email-notifications:
 *   post:
 *     tags: [Member Settings]
 *     summary: Update email notification settings for a member
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   flag:
 *                     type: boolean
 *                     description: Whether to enable or disable email notifications
 *                     example: true
 *                   type:
 *                     type: string
 *                     description: Type of email notification (e.g., "marketing", "transactional")
 *                     example: "transactional"
 *             required:
 *               - data
 *     responses:
 *       200:
 *         description: Email notification settings successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: true
 *       400:
 *         description: Bad request, invalid input.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Member not found.
 *       500:
 *         description: Internal server error.
 *
 * /api/member/v1/update-push-asked:
 *   post:
 *     tags: [Member Settings]
 *     summary: Activate the "push asked" setting for a member
 *     description: This endpoint activates the "push asked" setting for a member, enabling general push notifications.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   flag:
 *                     type: boolean
 *                     description: The flag is set to true to activate the push asked setting.
 *                     example: true
 *                   type:
 *                     type: string
 *                     description: The type of push notification to enable. This is set to "general".
 *                     example: "general"
 *             required:
 *               - data
 *     responses:
 *       200:
 *         description: Push asked setting successfully activated.
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: true
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
export const updateMemberSettingsRouter = (router: Router): void => {
  const userAuth = Middleware.userAuth(path.join(__dirname, '../../../../credentials.json'), storage.currentUser)
  router.post('/update-sms-notifications',  userAuth, expressAdapter(updateSmsSettingsControllerAdapterFactory()))
  router.post('/update-push-notifications', userAuth, expressAdapter(updatePushSettingsControllerAdapterFactory()))
  router.post('/update-email-notifications', userAuth, expressAdapter(updateEmailSettingsControllerAdapterFactory()))
  router.post('/update-push-asked', userAuth, expressAdapter(activatePushAskedSettingsControllerAdapterFactory()))
  router.post('/add-fcm-token', userAuth, expressAdapter(addFcmTokenControllerFactory()))
  router.post('/remove-fcm-token', userAuth, expressAdapter(removeFcmTokenControllerFactory()))
}