"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptMemberUseCaseFactory = void 0;
var features_1 = require("@/data/features");
var pg_member_repository_1 = require("@/infra/repository/pg-member-repository");
var acceptMemberUseCaseFactory = function () {
    var pgMemberRepository = new pg_member_repository_1.PgMemberRepository();
    var acceptMemberUseCase = new features_1.AcceptMemberUseCase(pgMemberRepository);
    return acceptMemberUseCase;
};
exports.acceptMemberUseCaseFactory = acceptMemberUseCaseFactory;
