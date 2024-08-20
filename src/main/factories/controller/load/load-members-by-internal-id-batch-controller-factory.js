"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMembersByInternalIdBatchControllerFactory = void 0;
var load_by_internal_id_batch_controller_1 = require("@/application/controller/load/load-by-internal-id-batch-controller");
var pg_member_repository_1 = require("@/infra/repository/pg-member-repository");
var loadMembersByInternalIdBatchControllerFactory = function () {
    var pgMemberRepository = new pg_member_repository_1.PgMemberRepository();
    var loadByInternalIdBatchController = new load_by_internal_id_batch_controller_1.LoadByInternalIdBatchController(pgMemberRepository);
    return loadByInternalIdBatchController;
};
exports.loadMembersByInternalIdBatchControllerFactory = loadMembersByInternalIdBatchControllerFactory;
