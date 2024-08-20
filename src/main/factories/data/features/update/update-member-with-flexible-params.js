"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMemberWithFlexibleParamsFactory = void 0;
var update_member_with_flexibile_params_1 = require("@/data/features/update/update-member-with-flexibile-params");
var pg_member_repository_1 = require("@/infra/repository/pg-member-repository");
var updateMemberWithFlexibleParamsFactory = function () {
    var pgMemberRepository = new pg_member_repository_1.PgMemberRepository();
    var dbUpdateMember = new update_member_with_flexibile_params_1.UpdateMemberWithFlexibleParams(pgMemberRepository);
    return dbUpdateMember;
};
exports.updateMemberWithFlexibleParamsFactory = updateMemberWithFlexibleParamsFactory;
