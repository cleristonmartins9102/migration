"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.MemberUpdatePayload = void 0;
var core_models_1 = require("@adamsfoodservice/core-models");
var MemberUpdatePayload = /** @class */ (function (_super) {
    __extends(MemberUpdatePayload, _super);
    function MemberUpdatePayload(currentMemberModel, updatedData) {
        var _this = _super.call(this) || this;
        _this.updatedFields = {};
        _this.id = currentMemberModel.id;
        _this.updateField('first_name', currentMemberModel, updatedData);
        _this.updateField('last_name', currentMemberModel, updatedData);
        _this.updateField('customer_type', currentMemberModel, updatedData);
        _this.updateField('disabled', currentMemberModel, updatedData);
        _this.updateField('email_verified', currentMemberModel, updatedData);
        _this.updateField('internal_id', currentMemberModel, updatedData);
        _this.updateField('invoiced_by', currentMemberModel, updatedData);
        _this.updateField('payroll_number', currentMemberModel, updatedData);
        _this.updateField('role', currentMemberModel, updatedData);
        _this.updateField('branch', currentMemberModel, updatedData);
        _this.updateField('wallet', currentMemberModel, updatedData);
        _this.updateField('location', currentMemberModel, updatedData);
        _this.updateField('settings', currentMemberModel, updatedData);
        _this.updateField('contact', currentMemberModel, updatedData);
        _this.updateField('web_parent', currentMemberModel, updatedData);
        return _this;
    }
    MemberUpdatePayload.prototype.getUpdatedFields = function () {
        return this.updatedFields;
    };
    MemberUpdatePayload.prototype.updateField = function (fieldName, currentMemberModel, updatedData) {
        var _a, _b;
        var currentValue = typeof currentMemberModel[fieldName] === 'string' ? (_a = currentMemberModel[fieldName]) === null || _a === void 0 ? void 0 : _a.trim() : currentMemberModel[fieldName];
        var updatedValue = typeof updatedData[fieldName] === 'string' ? (_b = updatedData[fieldName]) === null || _b === void 0 ? void 0 : _b.trim() : updatedData[fieldName];
        var hasChanged = this.hasFieldChanged(currentValue, updatedValue, fieldName);
        if (this.isObject(hasChanged)) {
            this.updatedFields = __assign(__assign({}, this.updatedFields), hasChanged);
        }
        else {
            this.updatedFields[fieldName] = hasChanged;
        }
        this[fieldName] = updatedValue !== null && updatedValue !== void 0 ? updatedValue : currentValue;
    };
    MemberUpdatePayload.prototype.hasFieldChanged = function (currentValue, updatedValue, fieldName) {
        if (!this.isObject(currentValue) && !this.isObject(updatedValue)) {
            if ((!currentValue || !updatedValue))
                return false;
            if (currentValue !== updatedValue) {
                return true;
            }
            return false;
        }
        else {
            var objectChanged = this.deepCompareObjects(currentValue, updatedValue, fieldName);
            return objectChanged;
        }
    };
    MemberUpdatePayload.prototype.deepCompareObjects = function (obj1, obj2, fieldName) {
        var _a, _b, _c;
        var keys1 = Object.keys(obj1);
        var changedValues = {};
        for (var _i = 0, keys1_1 = keys1; _i < keys1_1.length; _i++) {
            var key = keys1_1[_i];
            if (obj1 && !obj2) {
                changedValues[fieldName] = __assign(__assign({}, changedValues[fieldName]), (_a = {}, _a[key] = false, _a));
                continue;
            }
            if (!(key in obj1) || !(key in obj2))
                continue;
            var hValue1 = obj1[key];
            var hValue2 = obj2[key];
            if (hValue1 !== hValue2) {
                if (!changedValues[fieldName]) {
                    changedValues[fieldName] = [];
                }
                changedValues[fieldName] = __assign(__assign({}, changedValues[fieldName]), (_b = {}, _b[key] = true, _b));
            }
            else {
                changedValues[fieldName] = __assign(__assign({}, changedValues[fieldName]), (_c = {}, _c[key] = false, _c));
            }
        }
        return changedValues;
    };
    MemberUpdatePayload.prototype.isObject = function (value) {
        return value !== null && typeof value === 'object';
    };
    return MemberUpdatePayload;
}(core_models_1.MemberModel));
exports.MemberUpdatePayload = MemberUpdatePayload;
