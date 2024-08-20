"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMemberSettingsNotificationFactory = void 0;
var update_member_settings_notification_1 = require("@/data/features/update/update-member-settings-notification");
var pg_member_repository_1 = require("@/infra/repository/pg-member-repository");
var updateMemberSettingsNotificationFactory = function () {
    var pgMemberRepository = new pg_member_repository_1.PgMemberRepository();
    var dbUpdateMember = new update_member_settings_notification_1.UpdateMemberSettingsNotification(pgMemberRepository);
    return dbUpdateMember;
};
exports.updateMemberSettingsNotificationFactory = updateMemberSettingsNotificationFactory;
