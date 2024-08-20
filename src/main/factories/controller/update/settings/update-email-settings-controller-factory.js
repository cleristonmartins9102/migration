"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmailSettingsControllerAdapterFactory = void 0;
var update_1 = require("@/application/controller/update");
var update_member_settings_controller_factory_1 = require("./update-member-settings-controller-factory");
var updateEmailSettingsControllerAdapterFactory = function () {
    var updateMemberSettingsController = (0, update_member_settings_controller_factory_1.updateMemberSettingsControllerFactory)();
    var updateEmailSettingsControllerAdapter = new update_1.UpdateEmailSettingsControllerAdapter(updateMemberSettingsController);
    return updateEmailSettingsControllerAdapter;
};
exports.updateEmailSettingsControllerAdapterFactory = updateEmailSettingsControllerAdapterFactory;
