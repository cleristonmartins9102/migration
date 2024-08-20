"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWalletBalanceFromErpDataRouter = void 0;
var adapters_1 = require("@/main/adapters");
var shared_modules_1 = require("@adamsfoodservice/shared-modules");
var storage_1 = require("@/application/storage/storage");
var update_wallet_balance_from_erp_data_controller_factory_1 = require("@/main/factories/controller/update/wallet/update-wallet/update-wallet-balance-from-erp-data-controller-factory");
var fakeAuthMiddleware = function (req, res, next) {
    new shared_modules_1.default.Hooks.AsyncScope(function () {
        storage_1.storage.currentUser.set({ email: 'john@gmail.com' });
        next();
    });
};
var updateWalletBalanceFromErpDataRouter = function (router) {
    router.post('/update/wallet/balance', fakeAuthMiddleware, (0, adapters_1.expressAdapter)((0, update_wallet_balance_from_erp_data_controller_factory_1.updateWalletBalanceFromErpDataControllerFactory)()));
};
exports.updateWalletBalanceFromErpDataRouter = updateWalletBalanceFromErpDataRouter;
