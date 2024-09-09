"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWalletBalanceFromErpDataControllerFactory = void 0;
var update_wallet_balance_from_erp_data_controller_1 = require("@/application/controller/update/wallet/update-wallet-balance-from-erp-data-controller");
var update_wallet_balance_controller_factory_1 = require("./update-wallet-balance-controller-factory");
var updateWalletBalanceFromErpDataControllerFactory = function () {
    var updateWalletBalanceControllerFactory = (0, update_wallet_balance_controller_factory_1.updateWalletControllerFactory)();
    var updateWalletBalanceFromErpDataController = new update_wallet_balance_from_erp_data_controller_1.UpdateWalletBalanceFromErpDataController(updateWalletBalanceControllerFactory);
    return updateWalletBalanceFromErpDataController;
};
exports.updateWalletBalanceFromErpDataControllerFactory = updateWalletBalanceFromErpDataControllerFactory;
