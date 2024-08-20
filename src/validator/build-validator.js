"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuilderValidator = void 0;
var email_validator_1 = require("./email-validator");
var is_array_validator_1 = require("./is-array-validator");
var is_boolean_validator_1 = require("./is-boolean-validator");
var is_nan_validator_1 = require("./is-nan-validator");
var is_number_validator_1 = require("./is-number-validator");
var is_object_validator_1 = require("./is-object-validator");
var is_string_validator_1 = require("./is-string-validator");
var min_validate_1 = require("./min-validate");
var required_any_parameted_validator_1 = require("./required-any-parameted-validator");
var required_parameter_validator_1 = require("./required-parameter-validator");
var BuilderValidator = /** @class */ (function () {
    function BuilderValidator(paramName) {
        this.paramName = paramName;
        this.validators = [];
    }
    BuilderValidator.prototype.requiredAny = function () {
        this.validators.push(new required_any_parameted_validator_1.RequiredAnyParameterValidator(this.paramName));
        return this;
    };
    BuilderValidator.prototype.required = function () {
        var alreadyAddedBefore = false;
        for (var _i = 0, _a = this.validators; _i < _a.length; _i++) {
            var validate = _a[_i];
            if (validate instanceof required_parameter_validator_1.RequiredParameterValidator)
                alreadyAddedBefore = true;
        }
        if (!alreadyAddedBefore) {
            this.validators.push(new required_parameter_validator_1.RequiredParameterValidator(this.paramName));
        }
        return this;
    };
    BuilderValidator.prototype.validateEmail = function () {
        this.required();
        this.validators.push(new email_validator_1.EmailValidator());
        return this;
    };
    BuilderValidator.prototype.isString = function () {
        this.required();
        this.validators.push(new is_string_validator_1.IsStringValidator(this.paramName));
        return this;
    };
    BuilderValidator.prototype.isObject = function () {
        this.required();
        this.validators.push(new is_object_validator_1.IsObjectValidator(this.paramName));
        return this;
    };
    BuilderValidator.prototype.isNan = function () {
        this.required();
        this.validators.push(new is_nan_validator_1.IsNanValidator(this.paramName));
        return this;
    };
    BuilderValidator.prototype.isBoolean = function () {
        this.required();
        this.validators.push(new is_boolean_validator_1.IsBooleanValidator(this.paramName));
        return this;
    };
    BuilderValidator.prototype.isNumber = function () {
        this.required();
        this.validators.push(new is_number_validator_1.IsNumberValidator(this.paramName));
        return this;
    };
    BuilderValidator.prototype.isArray = function () {
        this.required();
        this.validators.push(new is_array_validator_1.IsArrayValidator(this.paramName));
        return this;
    };
    BuilderValidator.prototype.min = function (min) {
        this.required();
        this.validators.push(new min_validate_1.MinValidate(min));
        return this;
    };
    BuilderValidator.of = function (paramName) {
        return new BuilderValidator(paramName);
    };
    BuilderValidator.prototype.build = function () {
        return this.validators;
    };
    return BuilderValidator;
}());
exports.BuilderValidator = BuilderValidator;
