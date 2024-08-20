"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMemberByPhoneNumberControllerFactory = void 0;
var load_member_by_phone_number_controller_1 = require("@/application/controller/load/load-member-by-phone-number-controller");
var pg_member_repository_1 = require("@/infra/repository/pg-member-repository");
var loadMemberByPhoneNumberControllerFactory = function () {
    var pgMemberRepository = new pg_member_repository_1.PgMemberRepository();
    var loadMemberByPhoneNumberController = new load_member_by_phone_number_controller_1.LoadMemberByPhoneNumberController(pgMemberRepository);
    return loadMemberByPhoneNumberController;
};
exports.loadMemberByPhoneNumberControllerFactory = loadMemberByPhoneNumberControllerFactory;
