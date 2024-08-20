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
var Mock_1 = require("jest-mock-extended/lib/Mock");
var timekeeper_1 = require("timekeeper");
var db_update_member_1 = require("@/data/features/db-update-member");
var stubs_1 = require("../../tests/stubs");
describe('Db Update Delivery', function () {
    var pgMemberRepo;
    var sut;
    var memberFakeData;
    beforeAll(function () {
        memberFakeData = (0, stubs_1.makeFakeMember)();
        timekeeper_1.default.freeze('2024-07-15 00:00:00');
        pgMemberRepo = (0, Mock_1.default)();
        pgMemberRepo.loadById.mockResolvedValue(memberFakeData);
        sut = new db_update_member_1.DbUpdateMember(pgMemberRepo);
    });
    it('should call findByOrderId with correct value', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pgMemberRepo.update.mockResolvedValueOnce(true);
                    return [4 /*yield*/, sut.update(memberFakeData)];
                case 1:
                    _a.sent();
                    expect(pgMemberRepo.loadById).toHaveBeenCalled();
                    expect(pgMemberRepo.loadById).toHaveBeenCalledWith(memberFakeData.id);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return RecordNotFoundError if findByOrderId returns null', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pgMemberRepo.loadById.mockResolvedValueOnce(null);
                    return [4 /*yield*/, expect(sut.update(memberFakeData)).rejects.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should call update with correct value', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pgMemberRepo.update.mockResolvedValueOnce(true);
                    return [4 /*yield*/, sut.update({ id: memberFakeData.id, role: 'updated_role' })];
                case 1:
                    _a.sent();
                    expect(pgMemberRepo.update).toHaveBeenCalled();
                    expect(pgMemberRepo.update).toHaveBeenCalledWith(__assign(__assign({}, memberFakeData), { role: 'updated_role' }));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not call with not allowed updated fields', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pgMemberRepo.update.mockResolvedValueOnce(true);
                    return [4 /*yield*/, sut.update({ id: memberFakeData.id, internal_id: 'updated_internalid', role: 'updated_role' })];
                case 1:
                    _a.sent();
                    expect(pgMemberRepo.update).toHaveBeenCalled();
                    expect(pgMemberRepo.update.mock.calls[0][0].internal_id).toBe(memberFakeData.internal_id);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return true on success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pgMemberRepo.update.mockResolvedValueOnce(true);
                    return [4 /*yield*/, sut.update(memberFakeData)];
                case 1:
                    response = _a.sent();
                    expect(response).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
});
