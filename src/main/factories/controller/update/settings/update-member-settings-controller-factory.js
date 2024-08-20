"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMemberSettingsControllerFactory = void 0;
var update_1 = require("@/application/controller/update");
var update_member_settings_use_case_1 = require("@/main/factories/data/features/update/update-member-settings-use-case");
var updateMemberSettingsControllerFactory = function () {
    var updateMemberSettingsNotification = (0, update_member_settings_use_case_1.updateMemberSettingsNotificationFactory)();
    var updateMemberSettingsController = new update_1.UpdateMemberSettingsController(updateMemberSettingsNotification);
    return updateMemberSettingsController;
};
exports.updateMemberSettingsControllerFactory = updateMemberSettingsControllerFactory;
