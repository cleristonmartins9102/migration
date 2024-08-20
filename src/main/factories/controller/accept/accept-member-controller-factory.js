"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptMemberControllerFactory = void 0;
var accept_member_controller_1 = require("@/application/controller/accept/accept-member-controller");
var features_1 = require("@/main/factories/data/features");
var acceptMemberControllerFactory = function () {
    var acceptMemberUseCase = (0, features_1.acceptMemberUseCaseFactory)();
    var acceptMemberController = new accept_member_controller_1.AcceptMemberController(acceptMemberUseCase);
    return acceptMemberController;
};
exports.acceptMemberControllerFactory = acceptMemberControllerFactory;
