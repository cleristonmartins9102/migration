"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMemberSettings = void 0;
var UpdateMemberSettings;
(function (UpdateMemberSettings) {
    var Types;
    (function (Types) {
        Types["transactional"] = "transactional";
        Types["marketing"] = "marketing";
        Types["general"] = "general";
    })(Types = UpdateMemberSettings.Types || (UpdateMemberSettings.Types = {}));
    var Resource;
    (function (Resource) {
        Resource["sms"] = "sms";
        Resource["email"] = "email";
        Resource["push"] = "push";
        Resource["pushAsked"] = "push_asked";
    })(Resource = UpdateMemberSettings.Resource || (UpdateMemberSettings.Resource = {}));
})(UpdateMemberSettings || (exports.UpdateMemberSettings = UpdateMemberSettings = {}));
