"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMemberHouseHold = exports.CreateMemberShop = void 0;
var CreateMemberShop = /** @class */ (function () {
    function CreateMemberShop(data) {
        this.user_account_id = data.user_account_id;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.customer_type = data.customer_type;
        this.disabled = data.disabled;
        this.email_verified = data.email_verified;
        this.internal_id = data.internal_id;
        this.invoiced_by = data.invoiced_by;
        this.role = data.role;
        this.branch = data.branch;
        this.shop = data.shop;
        this.wallet = data.wallet;
        this.location = data.location;
        this.settings = data.settings;
        this.contact = data.contact;
        this.web_parent = data.web_parent;
    }
    return CreateMemberShop;
}());
exports.CreateMemberShop = CreateMemberShop;
var CreateMemberHouseHold = /** @class */ (function () {
    function CreateMemberHouseHold(data) {
        this.user_account_id = data.user_account_id;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.customer_type = data.customer_type;
        this.disabled = data.disabled;
        this.email_verified = data.email_verified;
        this.internal_id = data.internal_id;
        this.invoiced_by = data.invoiced_by;
        this.role = data.role;
        this.branch = data.branch;
        this.payroll_number = data.payroll_number;
        this.wallet = data.wallet;
        this.location = data.location;
        this.settings = data.settings;
        this.contact = data.contact;
        this.web_parent = data.web_parent;
    }
    return CreateMemberHouseHold;
}());
exports.CreateMemberHouseHold = CreateMemberHouseHold;
