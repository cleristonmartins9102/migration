"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWalletControllerFactory = void 0;
var repository_1 = require("@/infra/repository");
var update_1 = require("@/application/controller/update");
var updateWalletControllerFactory = function () {
    var walletRepository = new repository_1.PgWalletRepository();
    var updateWalletBalanceController = new update_1.UpdateWalletController(walletRepository);
    return updateWalletBalanceController;
};
exports.updateWalletControllerFactory = updateWalletControllerFactory;
