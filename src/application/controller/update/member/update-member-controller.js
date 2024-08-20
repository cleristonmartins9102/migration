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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMemberController = void 0;
var contract_1 = require("@/application/contract");
var errors_1 = require("@/application/errors");
var http_1 = require("@/application/helpers/http");
var validator_1 = require("@/validator");
var allowed_content_types_validator_1 = require("@/validator/allowed-content-types-validator");
var content_types_enum_1 = require("@/application/enum/content-types-enum");
var storage_1 = require("@/application/storage/storage");
var shared_modules_1 = require("@adamsfoodservice/shared-modules");
var UpdateMemberController = /** @class */ (function (_super) {
    __extends(UpdateMemberController, _super);
    function UpdateMemberController(updateMemberUseCase) {
        var _this = _super.call(this) || this;
        _this.updateMemberUseCase = updateMemberUseCase;
        return _this;
    }
    /**
     * Handles the HTTP request to update a member's information.
     *
     * The method first validates the content type of the request and then processes the request body
     * depending on whether it comes from a system (via URL-encoded data) or a user (via JSON data).
     *
     * - If the request is URL-encoded, it expects a file to be uploaded, translates the file data to
     *   the API model, and performs the update.
     * - If the request is JSON, it updates the member data directly using the provided `internal_id`
     *   or `user_account_id`.
     *
     * @param httpRequest - The incoming HTTP request containing the member data to be updated.
     * @returns A promise that resolves to an HTTP response indicating the result of the operation.
     */
    UpdateMemberController.prototype.perform = function (httpRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var body, contentType, validator, error, validator_2, error_2, translatedData, _a, _b, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        body = httpRequest.body, contentType = httpRequest.contentType;
                        // Validate that the request body is present
                        if (!body)
                            return [2 /*return*/, (0, http_1.badRequest)('body')];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, , 9]);
                        validator = new allowed_content_types_validator_1.AllowedContentTypesValidator([content_types_enum_1.ContentTypes.Json, content_types_enum_1.ContentTypes.Urlencoded]);
                        return [4 /*yield*/, validator.validate(contentType)];
                    case 2:
                        error = _c.sent();
                        if (error)
                            return [2 /*return*/, (0, http_1.badRequest)(error.message)];
                        if (!(contentType === content_types_enum_1.ContentTypes.Urlencoded)) return [3 /*break*/, 5];
                        validator_2 = new validator_1.RequiredParameterValidator('file');
                        return [4 /*yield*/, validator_2.validate(body)];
                    case 3:
                        error_2 = _c.sent();
                        if (error_2)
                            return [2 /*return*/, (0, http_1.badRequest)(error_2)];
                        translatedData = shared_modules_1.default.Translate.translateErpDataToApiModel().translate(body.file).translatedData;
                        if (translatedData.length === 0)
                            return [2 /*return*/, (0, http_1.ok)(false)];
                        _a = http_1.ok;
                        return [4 /*yield*/, this.updateMemberUseCase.update(translatedData[0])];
                    case 4: 
                    // Perform the update using the translated data
                    return [2 /*return*/, _a.apply(void 0, [_c.sent()])];
                    case 5:
                        if (!body.internal_id) {
                            body.user_account_id = storage_1.storage.currentUser.get().id;
                        }
                        _b = http_1.ok;
                        return [4 /*yield*/, this.updateMemberUseCase.update(body)];
                    case 6: 
                    // Perform the update using the provided data
                    return [2 /*return*/, _b.apply(void 0, [_c.sent()])];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _c.sent();
                        // Handle not found errors specifically
                        if (error_1 instanceof errors_1.RecordNotFoundError) {
                            return [2 /*return*/, (0, http_1.notFound)(error_1.message)];
                        }
                        // Re-throw other errors
                        throw error_1;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return UpdateMemberController;
}(contract_1.Controller));
exports.UpdateMemberController = UpdateMemberController;
