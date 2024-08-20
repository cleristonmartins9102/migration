"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectMemberControllerFactory = void 0;
var reject_member_controller_1 = require("@/application/controller/reject/reject-member-controller");
var repository_1 = require("@/infra/repository");
var rejectMemberControllerFactory = function () {
    var pgMemberRepository = new repository_1.PgMemberRepository();
    var rejectMemberController = new reject_member_controller_1.RejectMemberController(pgMemberRepository);
    return rejectMemberController;
};
exports.rejectMemberControllerFactory = rejectMemberControllerFactory;
