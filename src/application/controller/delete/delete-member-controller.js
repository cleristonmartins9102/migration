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
exports.DeleteMemberController = void 0;
var contract_1 = require("@/application/contract");
var errors_1 = require("@/application/errors");
var http_1 = require("@/application/helpers/http");
/**
 * The `DeleteMemberController` class is responsible for handling HTTP requests
 * to delete a member's information. It extends a base `Controller` class and
 * utilizes the `DeleteMember` use case to perform the deletion operation.
 *
 * This controller expects an `internal_id` or `id` in the request body to identify
 * the member to be deleted. If the member is successfully deleted, it returns an
 * HTTP 200 response with the result of the operation.
 *
 * If the member cannot be found based on the provided identifier, it catches the
 * `RecordNotFoundError` and returns an HTTP 404 response with an appropriate error message.
 *
 * @param deleteMember - An instance of the `DeleteMember` use case, which contains
 * the logic for deleting a member's information from the database.
 *
 * @method perform - The main method that processes the HTTP request, performs the
 * delete operation, and returns the corresponding HTTP response.
 */
var DeleteMemberController = /** @class */ (function (_super) {
    __extends(DeleteMemberController, _super);
    function DeleteMemberController(deleteMember) {
        var _this = _super.call(this) || this;
        _this.deleteMember = deleteMember;
        return _this;
    }
    /**
     * Handles the HTTP request to delete a member's information.
     *
     * The method attempts to delete the member identified by the `internal_id` or `id`
     * provided in the request body. If successful, it returns an HTTP 200 response with
     * the result of the deletion.
     *
     * If the member is not found, it catches the `RecordNotFoundError` and returns an
     * HTTP 404 response.
     *
     * @param httpRequest - The incoming HTTP request containing the identifier of the
     * member to be deleted.
     * @returns A promise that resolves to an HTTP response indicating the result of the operation.
     */
    DeleteMemberController.prototype.perform = function (httpRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var body, dbDeleteResponse, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = httpRequest.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.deleteMember.delete({ internal_id: body === null || body === void 0 ? void 0 : body.internal_id })];
                    case 2:
                        dbDeleteResponse = _a.sent();
                        return [2 /*return*/, (0, http_1.ok)(dbDeleteResponse)];
                    case 3:
                        error_1 = _a.sent();
                        // Return a 404 response if the member is not found
                        if (error_1 instanceof errors_1.RecordNotFoundError)
                            return [2 /*return*/, (0, http_1.notFound)(error_1.message)];
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return DeleteMemberController;
}(contract_1.Controller));
exports.DeleteMemberController = DeleteMemberController;
