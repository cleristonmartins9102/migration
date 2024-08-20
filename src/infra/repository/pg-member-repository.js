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
exports.PgMemberRepository = void 0;
var models_1 = require("@/data/domain/models");
var client_1 = require("@prisma/client");
var shared_modules_1 = require("@adamsfoodservice/shared-modules");
var errors_1 = require("@/application/errors");
var storage_1 = require("@/application/storage/storage");
var PgMemberRepository = /** @class */ (function () {
    function PgMemberRepository() {
    }
    PgMemberRepository.prototype.create = function (memberData) {
        return __awaiter(this, void 0, void 0, function () {
            var prisma, memberExists, _a, wallet, location, settings, shop, contact, payroll_number, onlyMemberData, memberPrismaResponse, memberModel;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        prisma = new client_1.PrismaClient();
                        return [4 /*yield*/, prisma.member.findUnique({ where: { user_account_id: memberData.user_account_id } })];
                    case 1:
                        memberExists = _b.sent();
                        if (memberExists)
                            throw new errors_1.MemberAlreadyExistsError(memberData.user_account_id);
                        _a = memberData, wallet = _a.wallet, location = _a.location, settings = _a.settings, shop = _a.shop, contact = _a.contact, payroll_number = _a.payroll_number, onlyMemberData = __rest(_a, ["wallet", "location", "settings", "shop", "contact", "payroll_number"]);
                        return [4 /*yield*/, prisma.$transaction(function (prisma) { return __awaiter(_this, void 0, void 0, function () {
                                var memberPrismaResponse, deliveryDays, settingsHandled;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, prisma.member.create({ data: __assign(__assign({}, onlyMemberData), { internal_id: Math.floor(100000 + Math.random() * 900000).toString() }) })];
                                        case 1:
                                            memberPrismaResponse = _a.sent();
                                            return [4 /*yield*/, prisma.contact.create({ data: __assign(__assign({}, contact), { member: { connect: { id: memberPrismaResponse.id } } }) })];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, prisma.location.create({ data: __assign(__assign({}, location), { member: { connect: { id: memberPrismaResponse.id } } }) })];
                                        case 3:
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
                                            return [4 /*yield*/, prisma.settings.create({ data: __assign(__assign({}, settingsHandled), { member: { connect: { id: memberPrismaResponse.id } } }) })];
                                        case 4:
                                            _a.sent();
                                            return [4 /*yield*/, prisma.wallet.create({ data: __assign(__assign({}, wallet), { member: { connect: { id: memberPrismaResponse.id } } }) })];
                                        case 5:
                                            _a.sent();
                                            if (!(memberData instanceof models_1.CreateMemberHouseHold)) return [3 /*break*/, 7];
                                            return [4 /*yield*/, prisma.memberHouseHold.create({ data: { payroll_number: memberData.payroll_number, member: { connect: { id: memberPrismaResponse.id } } } })];
                                        case 6:
                                            _a.sent();
                                            _a.label = 7;
                                        case 7:
                                            if (!(memberData instanceof models_1.CreateMemberShop)) return [3 /*break*/, 9];
                                            return [4 /*yield*/, prisma.memberShop.create({ data: __assign(__assign({}, memberData.shop), { member: { connect: { id: memberPrismaResponse.id } } }) })];
                                        case 8:
                                            _a.sent();
                                            _a.label = 9;
                                        case 9: return [2 /*return*/, memberPrismaResponse];
                                    }
                                });
                            }); })];
                    case 2:
                        memberPrismaResponse = _b.sent();
                        memberModel = __assign(__assign({ id: memberPrismaResponse.id.toString() }, memberData), { updated_at: memberPrismaResponse.created_at, created_at: memberPrismaResponse.updated_at });
                        return [2 /*return*/, memberModel];
                }
            });
        });
    };
    PgMemberRepository.prototype.loadByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var prisma, prismaResponse, memberModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = new client_1.PrismaClient();
                        return [4 /*yield*/, prisma.member.findFirst({
                                where: { contact: { email: email } },
                                include: {
                                    location: true,
                                    contact: true,
                                    wallet: true,
                                    settings: true,
                                    membershop: true,
                                    memberhousehould: true,
                                },
                            })];
                    case 1:
                        prismaResponse = _a.sent();
                        console.log(email);
                        if (!prismaResponse)
                            return [2 /*return*/, null];
                        memberModel = {
                            id: prismaResponse.id.toString(),
                            user_account_id: prismaResponse.user_account_id,
                            first_name: prismaResponse.first_name,
                            last_name: prismaResponse.last_name,
                            customer_type: prismaResponse.customer_type,
                            disabled: prismaResponse.disabled,
                            email_verified: prismaResponse.email_verified,
                            internal_id: prismaResponse.internal_id,
                            invoiced_by: prismaResponse.invoiced_by,
                            payroll_number: parseInt(prismaResponse.payroll_number),
                            role: prismaResponse.role,
                            branch: prismaResponse.branch,
                            wallet: this.omitId(prismaResponse.wallet, 'memberId'),
                            location: this.omitId(prismaResponse.location, 'memberId'),
                            shop: this.omitId(prismaResponse.shop, 'memberId'),
                            settings: this.omitId(prismaResponse.settings, 'memberId'),
                            contact: this.omitId(prismaResponse.contact, 'memberId'),
                            web_parent: prismaResponse.web_parent,
                            updated_at: new shared_modules_1.default.DateTime.MomentAdapter(prismaResponse.created_at),
                            created_at: new shared_modules_1.default.DateTime.MomentAdapter(prismaResponse.updated_at)
                        };
                        return [2 /*return*/, memberModel];
                }
            });
        });
    };
    PgMemberRepository.prototype.loadById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var prisma, prismaResponse, memberModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = new client_1.PrismaClient();
                        return [4 /*yield*/, prisma.member.findUnique({
                                where: { id: parseInt(id) },
                                include: {
                                    location: true,
                                    contact: true,
                                    wallet: true,
                                    settings: true,
                                    membershop: true,
                                    memberhousehould: true,
                                },
                            })];
                    case 1:
                        prismaResponse = _a.sent();
                        if (!prismaResponse)
                            return [2 /*return*/, null];
                        memberModel = {
                            id: prismaResponse.id.toString(),
                            user_account_id: prismaResponse.user_account_id,
                            first_name: prismaResponse.first_name,
                            last_name: prismaResponse.last_name,
                            customer_type: prismaResponse.customer_type,
                            disabled: prismaResponse.disabled,
                            email_verified: prismaResponse.email_verified,
                            internal_id: prismaResponse.internal_id,
                            invoiced_by: prismaResponse.invoiced_by,
                            payroll_number: parseInt(prismaResponse.payroll_number),
                            role: prismaResponse.role,
                            branch: prismaResponse.branch,
                            wallet: this.omitId(prismaResponse.wallet, 'memberId'),
                            location: this.omitId(prismaResponse.location, 'memberId'),
                            shop: this.omitId(prismaResponse.shop, 'memberId'),
                            settings: this.omitId(prismaResponse.settings, 'memberId'),
                            contact: this.omitId(prismaResponse.contact, 'memberId'),
                            web_parent: prismaResponse.web_parent,
                            updated_at: new shared_modules_1.default.DateTime.MomentAdapter(prismaResponse.created_at),
                            created_at: new shared_modules_1.default.DateTime.MomentAdapter(prismaResponse.updated_at)
                        };
                        return [2 /*return*/, memberModel];
                }
            });
        });
    };
    PgMemberRepository.prototype.loadAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prisma, prismaResponse, response, _i, prismaResponse_1, member, memberModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = new client_1.PrismaClient();
                        return [4 /*yield*/, prisma.member.findMany({
                                include: {
                                    location: true,
                                    contact: true,
                                    wallet: true,
                                    settings: true,
                                    membershop: true,
                                    memberhousehould: true,
                                },
                            })];
                    case 1:
                        prismaResponse = _a.sent();
                        if (!prismaResponse)
                            return [2 /*return*/, []];
                        response = [];
                        for (_i = 0, prismaResponse_1 = prismaResponse; _i < prismaResponse_1.length; _i++) {
                            member = prismaResponse_1[_i];
                            memberModel = {
                                id: member.id.toString(),
                                user_account_id: member.user_account_id,
                                first_name: member.first_name,
                                last_name: member.last_name,
                                customer_type: member.customer_type,
                                disabled: member.disabled,
                                email_verified: member.email_verified,
                                internal_id: member.internal_id,
                                invoiced_by: member.invoiced_by,
                                payroll_number: parseInt(member.payroll_number),
                                role: member.role,
                                branch: member.branch,
                                wallet: this.omitId(member.wallet, 'memberId'),
                                location: this.omitId(member.location, 'memberId'),
                                shop: this.omitId(member.shop, 'memberId'),
                                settings: this.omitId(member.settings, 'memberId'),
                                contact: this.omitId(member.contact, 'memberId'),
                                web_parent: member.web_parent,
                                updated_at: new shared_modules_1.default.DateTime.MomentAdapter(member.created_at),
                                created_at: new shared_modules_1.default.DateTime.MomentAdapter(member.updated_at)
                            };
                            response.push(memberModel);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    PgMemberRepository.prototype.loadWithCriteria = function (criteria) {
        return __awaiter(this, void 0, void 0, function () {
            var prisma, dump, prismaResponse, response, _i, prismaResponse_2, member, memberModel, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = new client_1.PrismaClient();
                        dump = criteria.dump(shared_modules_1.SQL.Criteria.DataSourceType.Prisma);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, prisma.member.findMany({
                                where: dump,
                                include: {
                                    location: true,
                                    contact: true,
                                    wallet: true,
                                    settings: true,
                                    membershop: true,
                                    memberhousehould: true,
                                },
                            })];
                    case 2:
                        prismaResponse = _a.sent();
                        if (!prismaResponse)
                            return [2 /*return*/, []];
                        response = [];
                        for (_i = 0, prismaResponse_2 = prismaResponse; _i < prismaResponse_2.length; _i++) {
                            member = prismaResponse_2[_i];
                            memberModel = {
                                id: member.id.toString(),
                                user_account_id: member.user_account_id,
                                first_name: member.first_name,
                                last_name: member.last_name,
                                customer_type: member.customer_type,
                                disabled: member.disabled,
                                email_verified: member.email_verified,
                                internal_id: member.internal_id,
                                invoiced_by: member.invoiced_by,
                                payroll_number: parseInt(member.payroll_number),
                                role: member.role,
                                branch: member.branch,
                                wallet: this.omitId(member.wallet, 'memberId'),
                                location: this.omitId(member.location, 'memberId'),
                                shop: this.omitId(member.shop, 'memberId'),
                                settings: this.omitId(member.settings, 'memberId'),
                                contact: this.omitId(member.contact, 'memberId'),
                                web_parent: member.web_parent,
                                updated_at: new shared_modules_1.default.DateTime.MomentAdapter(member.created_at),
                                created_at: new shared_modules_1.default.DateTime.MomentAdapter(member.updated_at)
                            };
                            response.push(memberModel);
                        }
                        return [2 /*return*/, response];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1 instanceof Error)
                            if (error_1.name === 'PrismaClientValidationError') {
                                return [2 /*return*/, []];
                            }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, []];
                }
            });
        });
    };
    PgMemberRepository.prototype.loadByInternalIdBatch = function (internalIdBatch) {
        return __awaiter(this, void 0, void 0, function () {
            var prisma, prismaResponse, response, _i, prismaResponse_3, member, memberModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = new client_1.PrismaClient();
                        return [4 /*yield*/, prisma.member.findMany({
                                where: { internal_id: { in: internalIdBatch } },
                                include: {
                                    location: true,
                                    contact: true,
                                    wallet: true,
                                    settings: true,
                                    membershop: true,
                                    memberhousehould: true,
                                },
                            })];
                    case 1:
                        prismaResponse = _a.sent();
                        if (!prismaResponse)
                            return [2 /*return*/, []];
                        response = [];
                        for (_i = 0, prismaResponse_3 = prismaResponse; _i < prismaResponse_3.length; _i++) {
                            member = prismaResponse_3[_i];
                            memberModel = {
                                id: member.id.toString(),
                                user_account_id: member.user_account_id,
                                first_name: member.first_name,
                                last_name: member.last_name,
                                customer_type: member.customer_type,
                                disabled: member.disabled,
                                email_verified: member.email_verified,
                                internal_id: member.internal_id,
                                invoiced_by: member.invoiced_by,
                                payroll_number: parseInt(member.payroll_number),
                                role: member.role,
                                branch: member.branch,
                                wallet: this.omitId(member.wallet, 'memberId'),
                                location: this.omitId(member.location, 'memberId'),
                                shop: this.omitId(member.shop, 'memberId'),
                                settings: this.omitId(member.settings, 'memberId'),
                                contact: this.omitId(member.contact, 'memberId'),
                                web_parent: member.web_parent,
                                updated_at: new shared_modules_1.default.DateTime.MomentAdapter(member.created_at),
                                created_at: new shared_modules_1.default.DateTime.MomentAdapter(member.updated_at)
                            };
                            response.push(memberModel);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    PgMemberRepository.prototype.loadByUserAccountId = function (userAccountId) {
        return __awaiter(this, void 0, void 0, function () {
            var prisma, prismaResponse, memberModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = new client_1.PrismaClient();
                        return [4 /*yield*/, prisma.member.findUnique({
                                where: { user_account_id: userAccountId },
                                include: {
                                    location: true,
                                    contact: true,
                                    wallet: true,
                                    settings: true,
                                    membershop: true,
                                    memberhousehould: true,
                                },
                            })];
                    case 1:
                        prismaResponse = _a.sent();
                        if (!prismaResponse)
                            return [2 /*return*/, null];
                        memberModel = {
                            id: prismaResponse.id.toString(),
                            user_account_id: prismaResponse.user_account_id,
                            first_name: prismaResponse.first_name,
                            last_name: prismaResponse.last_name,
                            customer_type: prismaResponse.customer_type,
                            disabled: prismaResponse.disabled,
                            email_verified: prismaResponse.email_verified,
                            internal_id: prismaResponse.internal_id,
                            invoiced_by: prismaResponse.invoiced_by,
                            payroll_number: parseInt(prismaResponse.payroll_number),
                            role: prismaResponse.role,
                            branch: prismaResponse.branch,
                            wallet: this.omitId(prismaResponse.wallet, 'memberId'),
                            location: this.omitId(prismaResponse.location, 'memberId'),
                            shop: this.omitId(prismaResponse.shop, 'memberId'),
                            settings: this.omitId(prismaResponse.settings, 'memberId'),
                            contact: this.omitId(prismaResponse.contact, 'memberId'),
                            web_parent: prismaResponse.web_parent,
                            updated_at: new shared_modules_1.default.DateTime.MomentAdapter(prismaResponse.created_at),
                            created_at: new shared_modules_1.default.DateTime.MomentAdapter(prismaResponse.updated_at)
                        };
                        return [2 /*return*/, memberModel];
                }
            });
        });
    };
    PgMemberRepository.prototype.loadWallet = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var prisma, user_account_id, prismaResponse, walletModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = new client_1.PrismaClient();
                        user_account_id = storage_1.storage.currentUser.get().id;
                        return [4 /*yield*/, prisma.member.findUnique({
                                where: { user_account_id: user_account_id },
                                include: {
                                    location: true,
                                    contact: true,
                                    wallet: true,
                                    settings: true,
                                    membershop: true,
                                    memberhousehould: true,
                                },
                            })];
                    case 1:
                        prismaResponse = _a.sent();
                        if (!prismaResponse)
                            return [2 /*return*/, null];
                        walletModel = {
                            balance: prismaResponse.wallet.balance
                        };
                        return [2 /*return*/, walletModel];
                }
            });
        });
    };
    PgMemberRepository.prototype.loadByInternalId = function (internal_id) {
        return __awaiter(this, void 0, void 0, function () {
            var prisma, prismaResponse, memberModel, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = new client_1.PrismaClient();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, prisma.member.findUnique({
                                where: {
                                    internal_id: internal_id,
                                },
                                include: {
                                    memberhousehould: true,
                                    membershop: true,
                                    location: true,
                                    contact: true,
                                    settings: true,
                                    wallet: true,
                                }
                            })];
                    case 2:
                        prismaResponse = _a.sent();
                        if (!prismaResponse)
                            return [2 /*return*/, null];
                        memberModel = {
                            id: prismaResponse.id.toString(),
                            user_account_id: prismaResponse.user_account_id,
                            first_name: prismaResponse.first_name,
                            last_name: prismaResponse.last_name,
                            customer_type: prismaResponse.customer_type,
                            disabled: prismaResponse.disabled,
                            email_verified: prismaResponse.email_verified,
                            internal_id: prismaResponse.internal_id,
                            invoiced_by: prismaResponse.invoiced_by,
                            payroll_number: parseInt(prismaResponse.payroll_number),
                            role: prismaResponse.role,
                            branch: prismaResponse.branch,
                            wallet: prismaResponse.wallet,
                            location: prismaResponse.location,
                            shop: prismaResponse.shop,
                            settings: prismaResponse.settings,
                            contact: prismaResponse.contact,
                            web_parent: prismaResponse.web_parent,
                            updated_at: new shared_modules_1.default.DateTime.MomentAdapter(prismaResponse.created_at),
                            created_at: new shared_modules_1.default.DateTime.MomentAdapter(prismaResponse.updated_at)
                        };
                        return [2 /*return*/, memberModel];
                    case 3:
                        error_2 = _a.sent();
                        if (error_2 instanceof Error)
                            throw new errors_1.PrismaError(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, null];
                }
            });
        });
    };
    PgMemberRepository.prototype.loadByPhoneNumber = function (phoneNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var prisma, prismaResponse, memberModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = new client_1.PrismaClient();
                        return [4 /*yield*/, prisma.member.findFirst({
                                where: {
                                    contact: {
                                        phone_number: phoneNumber
                                    }
                                },
                                include: {
                                    memberhousehould: true,
                                    membershop: true,
                                    location: true,
                                    contact: true,
                                    settings: true,
                                    wallet: true,
                                }
                            })];
                    case 1:
                        prismaResponse = _a.sent();
                        if (!prismaResponse)
                            return [2 /*return*/, null];
                        memberModel = {
                            id: prismaResponse.id.toString(),
                            user_account_id: prismaResponse.user_account_id,
                            first_name: prismaResponse.first_name,
                            last_name: prismaResponse.last_name,
                            customer_type: prismaResponse.customer_type,
                            disabled: prismaResponse.disabled,
                            email_verified: prismaResponse.email_verified,
                            internal_id: prismaResponse.internal_id,
                            invoiced_by: prismaResponse.invoiced_by,
                            payroll_number: parseInt(prismaResponse.payroll_number),
                            role: prismaResponse.role,
                            branch: prismaResponse.branch,
                            wallet: prismaResponse.wallet,
                            location: prismaResponse.location,
                            shop: prismaResponse.shop,
                            settings: prismaResponse.settings,
                            contact: prismaResponse.contact,
                            web_parent: prismaResponse.web_parent,
                            updated_at: new shared_modules_1.default.DateTime.MomentAdapter(prismaResponse.created_at),
                            created_at: new shared_modules_1.default.DateTime.MomentAdapter(prismaResponse.updated_at)
                        };
                        return [2 /*return*/, memberModel];
                }
            });
        });
    };
    PgMemberRepository.prototype.update = function (memberData) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, wallet, settings, location, shop, contact, payroll_number, updatedFields, withoutId, prisma, data, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = memberData, id = _a.id, wallet = _a.wallet, settings = _a.settings, location = _a.location, shop = _a.shop, contact = _a.contact, payroll_number = _a.payroll_number, updatedFields = _a.updatedFields, withoutId = __rest(_a, ["id", "wallet", "settings", "location", "shop", "contact", "payroll_number", "updatedFields"]);
                        prisma = new client_1.PrismaClient();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        data = withoutId;
                        if (payroll_number)
                            data.memberhouse = { update: { payroll_number: payroll_number } };
                        if (shop)
                            data.shop = { update: shop };
                        if (wallet) {
                            data.wallet = { update: this.omitMemberId(wallet) };
                        }
                        if (settings)
                            data.settings = { update: this.omitMemberId(settings) };
                        if (location)
                            data.location = { update: this.omitMemberId(location) };
                        if (contact)
                            data.contact = { update: this.omitMemberId(contact) };
                        return [4 /*yield*/, prisma.member.update({ where: { id: parseInt(id) }, data: data })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, ''];
                    case 3:
                        error_3 = _b.sent();
                        if (error_3 instanceof Error)
                            console.log(error_3.message);
                        throw new errors_1.PrismaError(error_3);
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    };
    PgMemberRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var prisma;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = new client_1.PrismaClient();
                        return [4 /*yield*/, prisma.member.delete({ where: { id: parseInt(id) } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    PgMemberRepository.prototype.omitMemberId = function (obj, foreignKey) {
        if (obj && typeof obj === 'object') {
            if (foreignKey) {
                var _a = obj, _b = foreignKey, _ = _a[_b], id = _a.id, rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + "", "id"]);
                return rest;
            }
            else {
                var memberId = obj.memberId, rest = __rest(obj, ["memberId"]);
                return rest;
            }
        }
        return obj;
    };
    PgMemberRepository.prototype.omitId = function (obj, foreignKey) {
        if (obj && typeof obj === 'object') {
            if (foreignKey) {
                var _a = obj, _b = foreignKey, _ = _a[_b], id = _a.id, rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + "", "id"]);
                return rest;
            }
            else {
                var id = obj.id, rest = __rest(obj, ["id"]);
                return rest;
            }
        }
        return obj;
    };
    return PgMemberRepository;
}());
exports.PgMemberRepository = PgMemberRepository;
