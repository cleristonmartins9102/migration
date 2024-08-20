"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbUpdateMemberFactory = void 0;
var db_update_member_1 = require("@/data/features/update/db-update-member");
var pg_member_repository_1 = require("@/infra/repository/pg-member-repository");
var dbUpdateMemberFactory = function () {
    var pgMemberRepository = new pg_member_repository_1.PgMemberRepository();
    var dbUpdateMember = new db_update_member_1.DbUpdateMember(pgMemberRepository);
    return dbUpdateMember;
};
exports.dbUpdateMemberFactory = dbUpdateMemberFactory;
