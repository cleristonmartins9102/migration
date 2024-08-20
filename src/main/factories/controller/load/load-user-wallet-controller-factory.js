"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUserWalletControllerFactory = void 0;
var load_user_wallet_controller_1 = require("@/application/controller/load/load-user-wallet-controller");
var pg_member_repository_1 = require("@/infra/repository/pg-member-repository");
var loadUserWalletControllerFactory = function () {
    var pgMemberRepository = new pg_member_repository_1.PgMemberRepository();
    var loadUserWalletController = new load_user_wallet_controller_1.LoadUserWalletController(pgMemberRepository);
    return loadUserWalletController;
};
exports.loadUserWalletControllerFactory = loadUserWalletControllerFactory;
