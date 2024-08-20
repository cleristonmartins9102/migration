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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingJWTSecret = exports.TokenNotProvidedError = exports.InvalidTokenError = exports.UnauthorizedError = exports.InvalidContentTypeError = exports.RequiredParameterdError = exports.UserAlreadyExistsError = exports.WrongProvidedEmailError = exports.IsNotNanError = exports.IsNotNumberError = exports.IsNotArrayError = exports.RecordNotFoundError = exports.IsNotBooleanError = exports.IsNotObjectError = exports.PrismaError = exports.FcmTokenAlreadyExistsError = exports.MemberAlreadyExistsError = exports.IsNotStringError = exports.CustomError = void 0;
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CustomError;
}(Error));
exports.CustomError = CustomError;
var IsNotStringError = /** @class */ (function (_super) {
    __extends(IsNotStringError, _super);
    function IsNotStringError(parameterName) {
        var _this = _super.call(this, 'the parameter is not a string') || this;
        _this.parameterName = parameterName;
        _this.name = 'IsNotStringError';
        return _this;
    }
    return IsNotStringError;
}(CustomError));
exports.IsNotStringError = IsNotStringError;
var MemberAlreadyExistsError = /** @class */ (function (_super) {
    __extends(MemberAlreadyExistsError, _super);
    function MemberAlreadyExistsError(user_account_id) {
        var _this = _super.call(this, "the member already exists with user_account_id - ".concat(user_account_id)) || this;
        _this.parameterName = user_account_id;
        _this.name = 'MemberAlreadyExistsError';
        return _this;
    }
    return MemberAlreadyExistsError;
}(CustomError));
exports.MemberAlreadyExistsError = MemberAlreadyExistsError;
var FcmTokenAlreadyExistsError = /** @class */ (function (_super) {
    __extends(FcmTokenAlreadyExistsError, _super);
    function FcmTokenAlreadyExistsError(fcmToken) {
        var _this = _super.call(this, "fcm token already exists - ".concat(fcmToken)) || this;
        _this.name = 'FcmTokenAlreadyExistsError';
        return _this;
    }
    return FcmTokenAlreadyExistsError;
}(CustomError));
exports.FcmTokenAlreadyExistsError = FcmTokenAlreadyExistsError;
var PrismaError = /** @class */ (function (_super) {
    __extends(PrismaError, _super);
    function PrismaError(error) {
        var _this = _super.call(this, error.message) || this;
        _this.name = 'PrismaError';
        return _this;
    }
    return PrismaError;
}(CustomError));
exports.PrismaError = PrismaError;
var IsNotObjectError = /** @class */ (function (_super) {
    __extends(IsNotObjectError, _super);
    function IsNotObjectError(parameterName) {
        var _this = _super.call(this, 'the parameter is not an object') || this;
        _this.parameterName = parameterName;
        _this.name = 'IsNotObject';
        return _this;
    }
    return IsNotObjectError;
}(CustomError));
exports.IsNotObjectError = IsNotObjectError;
var IsNotBooleanError = /** @class */ (function (_super) {
    __extends(IsNotBooleanError, _super);
    function IsNotBooleanError(parameterName) {
        var _this = _super.call(this, 'the parameter is not a boolean') || this;
        _this.parameterName = parameterName;
        _this.name = 'IsNotBooleanError';
        return _this;
    }
    return IsNotBooleanError;
}(CustomError));
exports.IsNotBooleanError = IsNotBooleanError;
var RecordNotFoundError = /** @class */ (function (_super) {
    __extends(RecordNotFoundError, _super);
    function RecordNotFoundError(recordName, fieldName, fieldValue) {
        var _this = _super.call(this, "".concat(recordName, " was not found with ").concat(fieldName, " ").concat(fieldValue)) || this;
        _this.parameterName = fieldValue;
        _this.name = 'RecordNotFoundError';
        return _this;
    }
    return RecordNotFoundError;
}(CustomError));
exports.RecordNotFoundError = RecordNotFoundError;
var IsNotArrayError = /** @class */ (function (_super) {
    __extends(IsNotArrayError, _super);
    function IsNotArrayError(parameterName) {
        var _this = _super.call(this, 'the parameter is not an array') || this;
        _this.parameterName = parameterName;
        _this.name = 'IsNotArrayError';
        return _this;
    }
    return IsNotArrayError;
}(CustomError));
exports.IsNotArrayError = IsNotArrayError;
var IsNotNumberError = /** @class */ (function (_super) {
    __extends(IsNotNumberError, _super);
    function IsNotNumberError(parameterName) {
        var _this = _super.call(this, 'the parameter is not a number') || this;
        _this.parameterName = parameterName;
        _this.name = 'IsNotNumberError';
        return _this;
    }
    return IsNotNumberError;
}(CustomError));
exports.IsNotNumberError = IsNotNumberError;
var IsNotNanError = /** @class */ (function (_super) {
    __extends(IsNotNanError, _super);
    function IsNotNanError(parameterName) {
        var _this = _super.call(this, 'the parameter is not a NaN') || this;
        _this.parameterName = parameterName;
        _this.name = 'IsNotNanError';
        return _this;
    }
    return IsNotNanError;
}(CustomError));
exports.IsNotNanError = IsNotNanError;
var WrongProvidedEmailError = /** @class */ (function (_super) {
    __extends(WrongProvidedEmailError, _super);
    function WrongProvidedEmailError(email) {
        var _this = _super.call(this, "wrong provided email - ".concat(email)) || this;
        _this.parameterName = 'email';
        _this.name = 'WrongProvidedEmailError';
        return _this;
    }
    return WrongProvidedEmailError;
}(CustomError));
exports.WrongProvidedEmailError = WrongProvidedEmailError;
var UserAlreadyExistsError = /** @class */ (function (_super) {
    __extends(UserAlreadyExistsError, _super);
    function UserAlreadyExistsError(email) {
        var _this = _super.call(this, "the user already exists ".concat(email)) || this;
        _this.parameterName = 'email';
        _this.name = 'UserAlreadyExistsError';
        return _this;
    }
    return UserAlreadyExistsError;
}(CustomError));
exports.UserAlreadyExistsError = UserAlreadyExistsError;
var RequiredParameterdError = /** @class */ (function (_super) {
    __extends(RequiredParameterdError, _super);
    function RequiredParameterdError(paramName) {
        var _this = _super.call(this, 'required parameter error') || this;
        _this.parameterName = paramName;
        _this.name = 'RequiredParameterError';
        return _this;
    }
    return RequiredParameterdError;
}(CustomError));
exports.RequiredParameterdError = RequiredParameterdError;
var InvalidContentTypeError = /** @class */ (function (_super) {
    __extends(InvalidContentTypeError, _super);
    function InvalidContentTypeError(allowedContentTypes) {
        var _this = _super.call(this, "invalid content type error - ".concat(allowedContentTypes.join(' or '))) || this;
        _this.name = 'InvalidContentTypeError';
        return _this;
    }
    return InvalidContentTypeError;
}(CustomError));
exports.InvalidContentTypeError = InvalidContentTypeError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError() {
        var _this = _super.call(this, 'unauthorized') || this;
        _this.name = 'UnauthorizedError';
        return _this;
    }
    return UnauthorizedError;
}(CustomError));
exports.UnauthorizedError = UnauthorizedError;
var InvalidTokenError = /** @class */ (function (_super) {
    __extends(InvalidTokenError, _super);
    function InvalidTokenError() {
        var _this = _super.call(this, 'invalid token provided') || this;
        _this.name = 'InvalidTokenError';
        return _this;
    }
    return InvalidTokenError;
}(CustomError));
exports.InvalidTokenError = InvalidTokenError;
var TokenNotProvidedError = /** @class */ (function (_super) {
    __extends(TokenNotProvidedError, _super);
    function TokenNotProvidedError() {
        var _this = _super.call(this, 'token not provided') || this;
        _this.name = 'TokenNotProvidedError';
        return _this;
    }
    return TokenNotProvidedError;
}(CustomError));
exports.TokenNotProvidedError = TokenNotProvidedError;
var MissingJWTSecret = /** @class */ (function (_super) {
    __extends(MissingJWTSecret, _super);
    function MissingJWTSecret() {
        var _this = _super.call(this, 'missing jwt secret') || this;
        _this.parameterName = 'email';
        _this.name = 'MissingJwtSecret';
        return _this;
    }
    return MissingJWTSecret;
}(CustomError));
exports.MissingJWTSecret = MissingJWTSecret;
