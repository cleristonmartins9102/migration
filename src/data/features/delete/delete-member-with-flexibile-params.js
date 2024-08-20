"use strict";
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
exports.DeleteMemberWithFlexibleParams = void 0;
var errors_1 = require("@/application/errors");
/**
 * The `DeleteMemberWithFlexibleParams` class implements the `DeleteMember` interface,
 * providing a flexible way to delete member data based on different identification parameters.
 *
 * This class is designed to handle scenarios where a member can be identified by either a
 * `userAccountId` or an `internal_id`. It abstracts the logic for fetching the member data
 * from the database and deleting it.
 *
 * @param pgMemberRepository - A repository instance that handles database operations for members.
 * This repository should implement the following interfaces:
 *  - `LoadByUserAccountIdRepository`: To load a member by `user_account_id`.
 *  - `LoadByInternalIdRepository`: To load a member by `internal_id`.
 *  - `DeleteMemberRepository`: To delete the member data from the database.
 *
 * @method delete - The main method that performs the delete operation. It first attempts to load
 * the member by `userAccountId` or `internal_id`. If the member is found, it deletes the member
 * from the database.
 *
 * @throws RecordNotFoundError - If no member is found for the provided `userAccountId` or `internal_id`.
 *
 * @returns `boolean` - Returns `true` if the member was successfully deleted.
 */
var DeleteMemberWithFlexibleParams = /** @class */ (function () {
    function DeleteMemberWithFlexibleParams(pgMemberRepository) {
        this.pgMemberRepository = pgMemberRepository;
    }
    /**
     * Deletes a member's information based on the provided `inputData`.
     *
     * The method first checks if the member can be identified by `userAccountId` or `internal_id`.
     * If the member is found, it deletes the member from the database.
     *
     * @param inputData - The data containing the identification parameters for the member to be deleted.
     * @returns `boolean` - Returns `true` if the deletion was successful.
     */
    DeleteMemberWithFlexibleParams.prototype.delete = function (inputData) {
        return __awaiter(this, void 0, void 0, function () {
            var member, paramName, paramValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paramName = '';
                        paramValue = '';
                        if (!inputData.userAccountId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.pgMemberRepository.loadByUserAccountId(inputData.userAccountId)];
                    case 1:
                        member = _a.sent();
                        paramName = 'id';
                        paramValue = inputData.userAccountId;
                        return [3 /*break*/, 4];
                    case 2:
                        if (!inputData.internal_id) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.pgMemberRepository.loadByInternalId(inputData.internal_id)];
                    case 3:
                        member = _a.sent();
                        paramName = 'internal_id';
                        paramValue = inputData.internal_id;
                        _a.label = 4;
                    case 4:
                        // If no member is found, throw an error
                        if (!member) {
                            throw new errors_1.RecordNotFoundError('member', paramName, paramValue);
                        }
                        // Delete the member from the database
                        return [4 /*yield*/, this.pgMemberRepository.delete(member.id)];
                    case 5:
                        // Delete the member from the database
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return DeleteMemberWithFlexibleParams;
}());
exports.DeleteMemberWithFlexibleParams = DeleteMemberWithFlexibleParams;
