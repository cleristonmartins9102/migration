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
var shared_modules_1 = require("@adamsfoodservice/shared-modules");
var app_1 = require("@/main/config/app");
var supertest_1 = require("supertest");
var make_member_stub_1 = require("../../tests/stubs/make-member-stub");
jest.mock('../../src/infra/repository/pg-member-repository.ts', function () {
    return {
        PgMemberRepository: function () {
            return {
                create: function () { return (0, make_member_stub_1.makeFakeMember)(); }
            };
        }
    };
});
jest.mock('@adamsfoodservice/shared-middleware', function () { return ({
    Middleware: {
        userAuth: function () { return function (req, res, next) { }; },
        serviceAccountAuthMiddleware: function (permissionPath, storage) {
            return function (subject, action) {
                return function (req, res, next) {
                    new shared_modules_1.default.Hooks.AsyncScope(function () {
                        storage.set({ email: 'fake' });
                        next();
                    });
                };
            };
        }
    }
}); });
describe('Create Delivery Router', function () {
    it('should return 400 if missing order_id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var httpResponse, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = supertest_1.default;
                    return [4 /*yield*/, (0, app_1.createApp)()];
                case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])
                        .put('/api/member/v1/create')
                        .send()
                        .expect(400)];
                case 2:
                    httpResponse = _b.sent();
                    expect(httpResponse.body.filter(function (error) { return error.parameter === 'user_account_id'; }).length > 0).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return 400 if missing first_name', function () { return __awaiter(void 0, void 0, void 0, function () {
        var httpResponse, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = supertest_1.default;
                    return [4 /*yield*/, (0, app_1.createApp)()];
                case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])
                        .put('/api/member/v1/create')
                        .send()
                        .expect(400)];
                case 2:
                    httpResponse = _b.sent();
                    expect(httpResponse.body.filter(function (error) { return error.parameter === 'first_name'; }).length > 0).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return 400 if missing last_name', function () { return __awaiter(void 0, void 0, void 0, function () {
        var httpResponse, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = supertest_1.default;
                    return [4 /*yield*/, (0, app_1.createApp)()];
                case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])
                        .put('/api/member/v1/create')
                        .send()
                        .expect(400)];
                case 2:
                    httpResponse = _b.sent();
                    expect(httpResponse.body.filter(function (error) { return error.parameter === 'last_name'; }).length > 0).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return 400 if missing last_name', function () { return __awaiter(void 0, void 0, void 0, function () {
        var httpResponse, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = supertest_1.default;
                    return [4 /*yield*/, (0, app_1.createApp)()];
                case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])
                        .put('/api/member/v1/create')
                        .send()
                        .expect(400)];
                case 2:
                    httpResponse = _b.sent();
                    expect(httpResponse.body.filter(function (error) { return error.parameter === 'last_name'; }).length > 0).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return 400 if missing internal_id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var httpResponse, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = supertest_1.default;
                    return [4 /*yield*/, (0, app_1.createApp)()];
                case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])
                        .put('/api/member/v1/create')
                        .send()
                        .expect(400)];
                case 2:
                    httpResponse = _b.sent();
                    expect(httpResponse.body.filter(function (error) { return error.parameter === 'internal_id'; }).length > 0).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return 400 if missing role', function () { return __awaiter(void 0, void 0, void 0, function () {
        var httpResponse, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = supertest_1.default;
                    return [4 /*yield*/, (0, app_1.createApp)()];
                case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])
                        .put('/api/member/v1/create')
                        .send()
                        .expect(400)];
                case 2:
                    httpResponse = _b.sent();
                    expect(httpResponse.body.filter(function (error) { return error.parameter === 'role'; }).length > 0).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return 400 if missing branch', function () { return __awaiter(void 0, void 0, void 0, function () {
        var httpResponse, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = supertest_1.default;
                    return [4 /*yield*/, (0, app_1.createApp)()];
                case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])
                        .put('/api/member/v1/create')
                        .send()
                        .expect(400)];
                case 2:
                    httpResponse = _b.sent();
                    expect(httpResponse.body.filter(function (error) { return error.parameter === 'branch'; }).length > 0).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('shop', function () {
        it('should return 400 if missing shop', function () { return __awaiter(void 0, void 0, void 0, function () {
            var httpResponse, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = supertest_1.default;
                        return [4 /*yield*/, (0, app_1.createApp)()];
                    case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])
                            .put('/api/member/v1/create')
                            .send()
                            .expect(400)];
                    case 2:
                        httpResponse = _b.sent();
                        expect(httpResponse.body.filter(function (error) { return error.parameter === 'shop'; }).length > 0).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('should return 201 on succeds', function () { return __awaiter(void 0, void 0, void 0, function () {
        var httpResponse, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = supertest_1.default;
                    return [4 /*yield*/, (0, app_1.createApp)()];
                case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()]).put('/api/member/v1/create')
                        .send((0, make_member_stub_1.makeFakeMember)())];
                case 2:
                    httpResponse = _b.sent();
                    expect(httpResponse.statusCode).toBe(201);
                    return [2 /*return*/];
            }
        });
    }); });
});
