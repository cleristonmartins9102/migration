"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMemberByInternalIdControllerFactory = void 0;
var load_1 = require("@/application/controller/load");
var pg_member_repository_1 = require("@/infra/repository/pg-member-repository");
var loadMemberByInternalIdControllerFactory = function () {
    var pgMemberRepository = new pg_member_repository_1.PgMemberRepository();
    var loadMemberByInternalIdController = new load_1.LoadMemberByInternalIdController(pgMemberRepository);
    return loadMemberByInternalIdController;
};
exports.loadMemberByInternalIdControllerFactory = loadMemberByInternalIdControllerFactory;
