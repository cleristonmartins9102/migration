"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activatePushAskedSettingsControllerAdapterFactory = void 0;
var update_1 = require("@/application/controller/update");
var update_member_settings_controller_factory_1 = require("./update-member-settings-controller-factory");
var activatePushAskedSettingsControllerAdapterFactory = function () {
    var updateMemberSettingsController = (0, update_member_settings_controller_factory_1.updateMemberSettingsControllerFactory)();
    var activatePushAskedSettingsControllerAdapter = new update_1.ActivatePushAskedSettingsControllerAdapter(updateMemberSettingsController);
    return activatePushAskedSettingsControllerAdapter;
};
exports.activatePushAskedSettingsControllerAdapterFactory = activatePushAskedSettingsControllerAdapterFactory;
