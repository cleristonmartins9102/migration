"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateEmailTemplateAndSendServiceFactory = void 0;
var services_1 = require("@/data/services");
var repository_1 = require("@/infra/repository");
var populateEmailTemplateAndSendServiceFactory = function () {
    var pgMemberRepository = new repository_1.PgMemberRepository();
    var populateEmailTemplateAndSend = (0, services_1.populateEmailTemplateAndSendService)(pgMemberRepository);
    return populateEmailTemplateAndSend;
};
exports.populateEmailTemplateAndSendServiceFactory = populateEmailTemplateAndSendServiceFactory;
