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
var shared_modules_1 = require("@adamsfoodservice/shared-modules");
var controller_1 = require("@/application/controller");
var http_1 = require("@/application/helpers/http");
var stubs_1 = require("../../../tests/stubs");
var errors_1 = require("@/application/errors");
describe('Create Member Controller', function () {
    var memberFakeData = (0, stubs_1.makeFakeMember)();
    var formatMemberDataService;
    var pgDeliveryRepoDefaultResponse;
    var httpRequest = {
        body: memberFakeData
    };
    var pgMemberRepository;
    var sut;
    var validatorMock = (0, Mock_1.default)();
    var controllerBuildValidatorSpy;
    beforeAll(function () {
        timekeeper_1.default.freeze('2024-07-15 00:00:00');
        pgDeliveryRepoDefaultResponse = __assign(__assign({}, memberFakeData), { id: '1', created_at: new shared_modules_1.default.DateTime.MomentAdapter(), updated_at: new shared_modules_1.default.DateTime.MomentAdapter() });
        pgMemberRepository = (0, Mock_1.default)();
        formatMemberDataService = jest.fn();
        formatMemberDataService.mockReturnValue({ formatedData: 'anydata' });
        sut = new controller_1.CreateMemberController(pgMemberRepository, formatMemberDataService);
        controllerBuildValidatorSpy = jest.spyOn(sut, 'buildValidator');
        validatorMock.validate.mockResolvedValue(null);
        controllerBuildValidatorSpy.mockReturnValue(validatorMock);
        pgMemberRepository.create.mockResolvedValue(__assign(__assign({}, memberFakeData), { id: '1', created_at: new shared_modules_1.default.DateTime.MomentAdapter(), updated_at: new shared_modules_1.default.DateTime.MomentAdapter() }));
    });
    beforeEach(function () {
        pgMemberRepository.create.mockClear();
    });
    describe('format data', function () {
        it('should call formatMemberData with correct value', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sut.perform(httpRequest)];
                    case 1:
                        _a.sent();
                        expect(formatMemberDataService).toHaveBeenCalled();
                        expect(formatMemberDataService).toHaveBeenCalledWith(httpRequest.body);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('pgMemberRepository', function () {
        it('Should call pgMemberRepository with correct value', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sut.perform(httpRequest)];
                    case 1:
                        _a.sent();
                        expect(pgMemberRepository.create).toHaveBeenCalled();
                        expect(pgMemberRepository.create).toHaveBeenCalledWith({ formatedData: 'anydata' });
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should returns 400 if pgMemberRepository throws MemberAlreadyExistsError', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pgMemberRepository.create.mockRejectedValueOnce(new errors_1.MemberAlreadyExistsError('1'));
                        _a = expect;
                        return [4 /*yield*/, sut.perform(httpRequest)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).toEqual((0, http_1.badRequest)({ error: new errors_1.MemberAlreadyExistsError('1').message }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should rethrow if pgMemberRepository throw ', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pgMemberRepository.create.mockRejectedValueOnce(new Error('database error'));
                        return [4 /*yield*/, expect(sut.perform(httpRequest)).rejects.toThrow('database error')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('Should return 200 on success with the same value received from pgMemberRepository ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var controllerResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sut.perform(httpRequest)];
                case 1:
                    controllerResponse = _a.sent();
                    expect(controllerResponse).toMatchObject((0, http_1.created)(pgDeliveryRepoDefaultResponse));
                    return [2 /*return*/];
            }
        });
    }); });
});
