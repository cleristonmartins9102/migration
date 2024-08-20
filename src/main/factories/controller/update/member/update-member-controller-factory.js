"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMemberControllerFactory = void 0;
var update_member_controller_1 = require("@/application/controller/update/member/update-member-controller");
var update_member_with_flexible_params_1 = require("@/main/factories/data/features/update/update-member-with-flexible-params");
var updateMemberControllerFactory = function () {
    var dbUpdateMember = (0, update_member_with_flexible_params_1.updateMemberWithFlexibleParamsFactory)();
    var updateMemberController = new update_member_controller_1.UpdateMemberController(dbUpdateMember);
    return updateMemberController;
};
exports.updateMemberControllerFactory = updateMemberControllerFactory;
