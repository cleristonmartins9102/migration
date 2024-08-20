"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePushSettingsControllerAdapterFactory = void 0;
var update_1 = require("@/application/controller/update");
var update_member_settings_controller_factory_1 = require("./update-member-settings-controller-factory");
var updatePushSettingsControllerAdapterFactory = function () {
    var updateMemberSettingsController = (0, update_member_settings_controller_factory_1.updateMemberSettingsControllerFactory)();
    var updateSmsSettingsControllerAdapter = new update_1.UpdatePushSettingsControllerAdapter(updateMemberSettingsController);
    return updateSmsSettingsControllerAdapter;
};
exports.updatePushSettingsControllerAdapterFactory = updatePushSettingsControllerAdapterFactory;
