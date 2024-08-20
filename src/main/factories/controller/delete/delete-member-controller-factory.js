"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMemberControllerFactory = void 0;
var delete_member_controller_1 = require("@/application/controller/delete/delete-member-controller");
var delete_1 = require("../../data/features/delete");
var deleteMemberControllerFactory = function () {
    var deleteMemberWithFlexibleParams = (0, delete_1.deleteMemberWithFlexibleParamsFactory)();
    var deleteMemberController = new delete_member_controller_1.DeleteMemberController(deleteMemberWithFlexibleParams);
    return deleteMemberController;
};
exports.deleteMemberControllerFactory = deleteMemberControllerFactory;
