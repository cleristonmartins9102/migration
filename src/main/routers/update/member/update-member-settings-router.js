"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMemberSettingsRouter = void 0;
var adapters_1 = require("@/main/adapters");
var controller_1 = require("@/main/factories/controller");
var shared_middleware_1 = require("@adamsfoodservice/shared-middleware");
var path_1 = require("path");
var storage_1 = require("@/application/storage/storage");
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
var updateMemberSettingsRouter = function (router) {
    var userAuth = shared_middleware_1.Middleware.userAuth(path_1.default.join(__dirname, '../../../../credentials.json'), storage_1.storage.currentUser);
    router.post('/update-sms-notifications', userAuth, (0, adapters_1.expressAdapter)((0, controller_1.updateSmsSettingsControllerAdapterFactory)()));
    router.post('/update-push-notifications', userAuth, (0, adapters_1.expressAdapter)((0, controller_1.updatePushSettingsControllerAdapterFactory)()));
    router.post('/update-email-notifications', userAuth, (0, adapters_1.expressAdapter)((0, controller_1.updateEmailSettingsControllerAdapterFactory)()));
    router.post('/update-push-asked', userAuth, (0, adapters_1.expressAdapter)((0, controller_1.activatePushAskedSettingsControllerAdapterFactory)()));
};
exports.updateMemberSettingsRouter = updateMemberSettingsRouter;
