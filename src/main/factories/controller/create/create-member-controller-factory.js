"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMemberControllerFactory = void 0;
var create_1 = require("@/application/controller/create");
var services_1 = require("@/data/services");
var pg_member_repository_1 = require("@/infra/repository/pg-member-repository");
var createMemberControllerFactory = function () {
    var pgMemberRepository = new pg_member_repository_1.PgMemberRepository();
    var createMemberController = new create_1.CreateMemberController(pgMemberRepository, services_1.formatMemberDataService);
    return createMemberController;
};
exports.createMemberControllerFactory = createMemberControllerFactory;
