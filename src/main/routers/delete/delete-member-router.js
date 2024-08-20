"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMemberRouter = void 0;
var storage_1 = require("@/application/storage/storage");
var adapters_1 = require("@/main/adapters");
var controller_1 = require("@/main/factories/controller");
var shared_middleware_1 = require("@adamsfoodservice/shared-middleware");
var path_1 = require("path");
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
var deleteMemberRouter = function (router) {
    var authMiddleware = shared_middleware_1.Middleware.userAuth(path_1.default.join(__dirname, '../../../../credentials.json'), storage_1.storage.currentUser);
    router.delete('/', authMiddleware, (0, adapters_1.expressAdapter)((0, controller_1.deleteMemberControllerFactory)()));
};
exports.deleteMemberRouter = deleteMemberRouter;
