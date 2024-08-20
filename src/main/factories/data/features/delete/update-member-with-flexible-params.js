"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMemberWithFlexibleParamsFactory = void 0;
var features_1 = require("@/data/features");
var pg_member_repository_1 = require("@/infra/repository/pg-member-repository");
var deleteMemberWithFlexibleParamsFactory = function () {
    var pgMemberRepository = new pg_member_repository_1.PgMemberRepository();
    var deleteMember = new features_1.DeleteMemberWithFlexibleParams(pgMemberRepository);
    return deleteMember;
};
exports.deleteMemberWithFlexibleParamsFactory = deleteMemberWithFlexibleParamsFactory;
