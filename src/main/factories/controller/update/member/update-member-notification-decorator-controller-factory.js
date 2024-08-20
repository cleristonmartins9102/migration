"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMemberNotificationDecoratorControllerFactory = void 0;
var update_1 = require("@/application/controller/update");
var update_member_controller_factory_1 = require("./update-member-controller-factory");
var data_1 = require("@/main/factories/data");
var updateMemberNotificationDecoratorControllerFactory = function () {
    var updateMemberController = (0, update_member_controller_factory_1.updateMemberControllerFactory)();
    var populateEmailTemplateAndSendService = (0, data_1.populateEmailTemplateAndSendServiceFactory)();
    var updateMemberNotificationDecoratorController = new update_1.UpdateMemberNotificationDecoratorController(updateMemberController, populateEmailTemplateAndSendService);
    return updateMemberNotificationDecoratorController;
};
exports.updateMemberNotificationDecoratorControllerFactory = updateMemberNotificationDecoratorControllerFactory;
