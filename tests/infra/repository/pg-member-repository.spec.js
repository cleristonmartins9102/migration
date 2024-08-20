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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_member_repository_1 = require("@/infra/repository/pg-member-repository");
var make_member_stub_1 = require("../../../tests/stubs/make-member-stub");
var timekeeper_1 = require("timekeeper");
var createMemberMock = jest.fn();
createMemberMock.mockResolvedValue({ id: 1 });
var createContactMock = jest.fn();
var createLocationMock = jest.fn();
var createWalletMock = jest.fn();
var createShopMock = jest.fn();
var createSettingsMock = jest.fn();
var findUniqueMock = jest.fn();
var updateMock = jest.fn();
jest.mock('@prisma/client', function () {
    return {
        PrismaClient: function () {
            return {
                member: {
                    create: function (data) { return createMemberMock(data); },
                    findUnique: function (data) { return findUniqueMock(data); },
                    update: function (data) { return updateMock(data); }
                },
                contact: {
                    create: function (data) { return createContactMock(data); },
                    findUnique: function (data) { return findUniqueMock(data); },
                    update: function (data) { return updateMock(data); }
                },
                location: {
                    create: function (data) { return createLocationMock(data); },
                    findUnique: function (data) { return findUniqueMock(data); },
                    update: function (data) { return updateMock(data); }
                },
                settings: {
                    create: function (data) { return createSettingsMock(data); },
                    findUnique: function (data) { return findUniqueMock(data); },
                    update: function (data) { return updateMock(data); }
                },
                wallet: {
                    create: function (data) { return createWalletMock(data); },
                    findUnique: function (data) { return findUniqueMock(data); },
                    update: function (data) { return updateMock(data); }
                }
            };
        }
    };
});
describe('PgMemberRepository', function () {
    var createMemberData;
    var _a = (0, make_member_stub_1.makeFakeMember)(), created_at = _a.created_at, updated_at = _a.updated_at, rest = __rest(_a, ["created_at", "updated_at"]);
    beforeAll(function () {
        timekeeper_1.default.freeze('2024-08-05T11:47:36');
        findUniqueMock.mockClear();
        createMemberMock.mockResolvedValue(__assign(__assign({}, createMemberData), { id: '1' }));
    });
    beforeEach(function () {
        createMemberData = (0, make_member_stub_1.makeFakeMember)();
        createMemberMock.mockClear();
        createContactMock.mockClear();
        createLocationMock.mockClear();
        createSettingsMock.mockClear();
        createWalletMock.mockClear();
        createShopMock.mockClear();
    });
    describe('Save', function () {
        it('should call findUnique with correct value', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = new pg_member_repository_1.PgMemberRepository();
                        return [4 /*yield*/, sut.create(createMemberData)];
                    case 1:
                        _a.sent();
                        expect(findUniqueMock).toHaveBeenCalled();
                        expect(findUniqueMock).toHaveBeenCalledWith({ where: { user_account_id: createMemberData.user_account_id } });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should throw MemberAlreadyExistsError if user with user_account_id exists', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        findUniqueMock.mockResolvedValueOnce({ member: 1 });
                        sut = new pg_member_repository_1.PgMemberRepository();
                        return [4 /*yield*/, expect(sut.create(createMemberData)).rejects.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call member.create with correct value', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut, shop, wallet, location, settings, contact, rest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = new pg_member_repository_1.PgMemberRepository();
                        shop = createMemberData.shop, wallet = createMemberData.wallet, location = createMemberData.location, settings = createMemberData.settings, contact = createMemberData.contact, rest = __rest(createMemberData, ["shop", "wallet", "location", "settings", "contact"]);
                        return [4 /*yield*/, sut.create(createMemberData)];
                    case 1:
                        _a.sent();
                        expect(createMemberMock).toHaveBeenCalled();
                        expect(createMemberMock).toHaveBeenCalledWith({ data: rest });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call contact.create with correct value', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut, shop, wallet, location, settings, contact, rest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = new pg_member_repository_1.PgMemberRepository();
                        shop = createMemberData.shop, wallet = createMemberData.wallet, location = createMemberData.location, settings = createMemberData.settings, contact = createMemberData.contact, rest = __rest(createMemberData, ["shop", "wallet", "location", "settings", "contact"]);
                        return [4 /*yield*/, sut.create(createMemberData)];
                    case 1:
                        _a.sent();
                        expect(createContactMock).toHaveBeenCalled();
                        expect(createContactMock).toHaveBeenCalledWith({ data: __assign(__assign({}, contact), { member: { connect: { id: '1' } } }) });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call address.create with correct value', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut, shop, wallet, location, settings, contact, rest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = new pg_member_repository_1.PgMemberRepository();
                        shop = createMemberData.shop, wallet = createMemberData.wallet, location = createMemberData.location, settings = createMemberData.settings, contact = createMemberData.contact, rest = __rest(createMemberData, ["shop", "wallet", "location", "settings", "contact"]);
                        return [4 /*yield*/, sut.create(createMemberData)];
                    case 1:
                        _a.sent();
                        expect(createLocationMock).toHaveBeenCalled();
                        expect(createLocationMock).toHaveBeenCalledWith({ data: __assign(__assign({}, location), { member: { connect: { id: '1' } } }) });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call settings.create with correct value', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut, shop, wallet, location, settings, contact, rest, deliveryDays, settingsHandled;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = new pg_member_repository_1.PgMemberRepository();
                        shop = createMemberData.shop, wallet = createMemberData.wallet, location = createMemberData.location, settings = createMemberData.settings, contact = createMemberData.contact, rest = __rest(createMemberData, ["shop", "wallet", "location", "settings", "contact"]);
                        return [4 /*yield*/, sut.create(createMemberData)];
                    case 1:
                        _a.sent();
                        deliveryDays = [];
                        if (settings.delivery_day_1)
                            deliveryDays.push('mon');
                        if (settings.delivery_day_2)
                            deliveryDays.push('tue');
                        if (settings.delivery_day_3)
                            deliveryDays.push('wed');
                        if (settings.delivery_day_4)
                            deliveryDays.push('thu');
                        if (settings.delivery_day_5)
                            deliveryDays.push('fri');
                        if (settings.delivery_day_6)
                            deliveryDays.push('sat');
                        if (settings.delivery_day_7)
                            deliveryDays.push('sun');
                        settingsHandled = {
                            can_deliver: settings.can_deliver,
                            delivery_day: deliveryDays,
                            push_asked: settings.push_asked,
                            marketing_email: settings.transac_marketing_notifications.marketing.email,
                            marketing_push: settings.transac_marketing_notifications.marketing.push,
                            marketing_sms: settings.transac_marketing_notifications.marketing.sms,
                            transactional_email: settings.transac_marketing_notifications.transactional.email,
                            transactional_push: settings.transac_marketing_notifications.transactional.push,
                            transactional_sms: settings.transac_marketing_notifications.transactional.sms
                        };
                        expect(createSettingsMock).toHaveBeenCalled();
                        expect(createSettingsMock).toHaveBeenCalledWith({ data: __assign(__assign({}, settingsHandled), { member: { connect: { id: '1' } } }) });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call wallet.create with correct value', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut, shop, wallet, location, settings, contact, rest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = new pg_member_repository_1.PgMemberRepository();
                        shop = createMemberData.shop, wallet = createMemberData.wallet, location = createMemberData.location, settings = createMemberData.settings, contact = createMemberData.contact, rest = __rest(createMemberData, ["shop", "wallet", "location", "settings", "contact"]);
                        return [4 /*yield*/, sut.create(createMemberData)];
                    case 1:
                        _a.sent();
                        expect(createWalletMock).toHaveBeenCalled();
                        expect(createWalletMock).toHaveBeenCalledWith({ data: __assign(__assign({}, wallet), { member: { connect: { id: '1' } } }) });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call shop.create with correct value if is a shop custumer', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut, shop, wallet, location, settings, contact, rest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = new pg_member_repository_1.PgMemberRepository();
                        shop = createMemberData.shop, wallet = createMemberData.wallet, location = createMemberData.location, settings = createMemberData.settings, contact = createMemberData.contact, rest = __rest(createMemberData, ["shop", "wallet", "location", "settings", "contact"]);
                        return [4 /*yield*/, sut.create(createMemberData)];
                    case 1:
                        _a.sent();
                        expect(createShopMock).toHaveBeenCalled();
                        expect(createShopMock).toHaveBeenCalledWith({ data: __assign(__assign({}, shop), { member: { connect: { id: '1' } } }) });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not call shop.create with correct value if is not a shop', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut, shop, withoutShop;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = new pg_member_repository_1.PgMemberRepository();
                        shop = createMemberData.shop, withoutShop = __rest(createMemberData, ["shop"]);
                        return [4 /*yield*/, sut.create(withoutShop)];
                    case 1:
                        _a.sent();
                        expect(createShopMock).not.toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should returns the same value received from prisma', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createMemberMock.mockResolvedValueOnce(__assign(__assign({}, rest), { created_at: '2024', updated_at: '2024', id: '1' }));
                        sut = new pg_member_repository_1.PgMemberRepository();
                        return [4 /*yield*/, sut.create(createMemberData)];
                    case 1:
                        data = _a.sent();
                        expect(data).toMatchObject(__assign(__assign({}, rest), { id: '1' }));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should rethrow if prisma throws', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createMemberMock.mockRejectedValueOnce(new Error(''));
                        sut = new pg_member_repository_1.PgMemberRepository();
                        return [4 /*yield*/, expect(sut.create(createMemberData)).rejects.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('LoadById', function () {
        it('should call findUnique with correct value', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sut = new pg_member_repository_1.PgMemberRepository();
                        return [4 /*yield*/, sut.loadById('2')];
                    case 1:
                        _a.sent();
                        expect(findUniqueMock).toHaveBeenCalled();
                        expect(findUniqueMock).toHaveBeenCalledWith({ where: { id: 2 } });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Update', function () {
        it('should call update with correct value', function () { return __awaiter(void 0, void 0, void 0, function () {
            var sut;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        findUniqueMock.mockResolvedValueOnce({ id: 2, role: 'dev' });
                        sut = new pg_member_repository_1.PgMemberRepository();
                        return [4 /*yield*/, sut.update({ id: '2', role: 'new role' })];
                    case 1:
                        _a.sent();
                        expect(updateMock).toHaveBeenCalled();
                        expect(updateMock).toHaveBeenCalledWith({ where: { id: 2 }, data: { role: 'new role' } });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
