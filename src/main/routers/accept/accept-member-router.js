"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptMemberRouter = void 0;
var adapters_1 = require("../../adapters");
var controller_1 = require("@/main/factories/controller");
var shared_middleware_1 = require("@adamsfoodservice/shared-middleware");
var path_1 = require("path");
var storage_1 = require("@/application/storage/storage");
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
var acceptMemberRouter = function (router) {
    var authMiddleware = shared_middleware_1.Middleware.userAuth(path_1.default.join(__dirname, '../../../../credentials.json'), storage_1.storage.currentUser);
    router.post('/accept', authMiddleware, (0, adapters_1.expressAdapter)((0, controller_1.acceptMemberControllerFactory)()));
};
exports.acceptMemberRouter = acceptMemberRouter;
