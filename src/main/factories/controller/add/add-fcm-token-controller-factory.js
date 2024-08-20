"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFcmTokenControllerFactory = void 0;
var controller_1 = require("@/application/controller");
var pg_settings_repository_1 = require("@/infra/repository/pg-settings-repository");
var addFcmTokenControllerFactory = function () {
    var pgSettingsRepository = new pg_settings_repository_1.PgSettingsRepository();
    var addFcmTokenController = new controller_1.AddFcmTokenController(pgSettingsRepository);
    return addFcmTokenController;
};
exports.addFcmTokenControllerFactory = addFcmTokenControllerFactory;
