"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMemberDataService = void 0;
var shared_modules_1 = require("@adamsfoodservice/shared-modules");
var formatMemberDataService = function (memberData) {
    memberData.first_name = shared_modules_1.Utils.removePontuaction(memberData.first_name).trim();
    memberData.last_name = shared_modules_1.Utils.removePontuaction(memberData.last_name).trim();
    if (memberData.location) {
        var address = shared_modules_1.Utils.removeNoAphanumericOrSpace(memberData.location.address).trim();
        var postcode = shared_modules_1.Utils.removeNoAphanumericOrSpace(memberData.location.postcode).toUpperCase().trim();
        var city = shared_modules_1.Utils.removeNoAphanumericOrSpace(memberData.location.city).trim();
        memberData.location = __assign(__assign({}, memberData.location), { postcode: postcode, city: city, address: address });
    }
    var phoneNumber = shared_modules_1.Utils.normalizeUKPhoneNumber(memberData.contact.phone_number).trim();
    memberData.contact = __assign(__assign({}, memberData.contact), { phone_number: phoneNumber });
    return memberData;
};
exports.formatMemberDataService = formatMemberDataService;
