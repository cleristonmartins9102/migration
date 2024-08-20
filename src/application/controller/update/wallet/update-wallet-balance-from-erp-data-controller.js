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
exports.UpdateWalletBalanceFromErpDataController = void 0;
var contract_1 = require("@/application/contract");
var http_1 = require("@/application/helpers/http");
var shared_modules_1 = require("@adamsfoodservice/shared-modules");
var UpdateWalletBalanceFromErpDataController = /** @class */ (function (_super) {
    __extends(UpdateWalletBalanceFromErpDataController, _super);
    function UpdateWalletBalanceFromErpDataController(updateWalletController) {
        var _this = _super.call(this) || this;
        _this.updateWalletController = updateWalletController;
        return _this;
    }
    UpdateWalletBalanceFromErpDataController.prototype.perform = function (httpRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var body, csvTranslate, updatedWallet, _i, _a, wallet, repositoryResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = httpRequest.body;
                        if (!body)
                            return [2 /*return*/, (0, http_1.badRequest)('body')];
                        csvTranslate = shared_modules_1.default.Translate.translateErpDataToApiModel().translate(body.file);
                        updatedWallet = [];
                        _i = 0, _a = csvTranslate.translatedData;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        wallet = _a[_i];
                        return [4 /*yield*/, this.updateWalletController.handler({ body: __assign(__assign({}, wallet), { balance: Number(wallet.balance) }) })];
                    case 2:
                        repositoryResponse = _b.sent();
                        if (repositoryResponse.statusCode === 200) {
                            updatedWallet.push({ wallet: { sn_account: wallet.internal_id, sn_wallbal: wallet.balance }, message: 'updated' });
                        }
                        else {
                            updatedWallet.push({ wallet: { sn_account: wallet.internal_id, sn_wallbal: wallet.balance }, message: repositoryResponse.body.replace('internal_id', 'sn_account') });
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, (0, http_1.ok)(updatedWallet)];
                }
            });
        });
    };
    return UpdateWalletBalanceFromErpDataController;
}(contract_1.Controller));
exports.UpdateWalletBalanceFromErpDataController = UpdateWalletBalanceFromErpDataController;
