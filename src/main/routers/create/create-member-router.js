"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMemberRouter = void 0;
var path_1 = require("path");
var storage_1 = require("@/application/storage/storage");
var add_fcm_token_controller_factory_1 = require("../../factories/controller/add/add-fcm-token-controller-factory");
var adapters_1 = require("@/main/adapters");
var controller_1 = require("@/main/factories/controller");
var shared_middleware_1 = require("@adamsfoodservice/shared-middleware");
/**
 * @swagger
 * /api/member/v1/create:
 *   put:
 *     tags: [Member]
 *     summary: Create a member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
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
 *     responses:
 *       201:
 *         description: Member successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/memberResponseSchema'
 *       400:
 *         description: Bad request, invalid input.
 *       404:
 *         description: Member not found.
 *       500:
 *         description: Internal server error.
 *
 * /api/member/v1/add-fcm-token:
 *   post:
 *     tags: [Member]
 *     summary: Add FCM token to a user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fcm-token:
 *                 type: string
 *     responses:
 *       200:
 *         description: FCM token successfully added.
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
var createMemberRouter = function (router) {
    var permissionPath = path_1.default.join(__dirname, '../../../../credentials.json');
    var userAuth = shared_middleware_1.Middleware.userAuth(permissionPath, storage_1.storage.currentUser);
    router.post('/add-fcm-token', userAuth, (0, adapters_1.expressAdapter)((0, add_fcm_token_controller_factory_1.addFcmTokenControllerFactory)()));
    router.put('/create', (0, adapters_1.expressAdapter)((0, controller_1.createMemberControllerFactory)()));
};
exports.createMemberRouter = createMemberRouter;
