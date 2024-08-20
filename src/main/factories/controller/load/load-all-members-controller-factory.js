"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAllMemberControllerFactory = void 0;
var load_all_members_controller_1 = require("@/application/controller/load/load-all-members-controller");
var pg_member_repository_1 = require("@/infra/repository/pg-member-repository");
var loadAllMemberControllerFactory = function () {
    var pgMemberRepository = new pg_member_repository_1.PgMemberRepository();
    var loadAllMembersController = new load_all_members_controller_1.LoadAllMembersController(pgMemberRepository);
    return loadAllMembersController;
};
exports.loadAllMemberControllerFactory = loadAllMemberControllerFactory;
