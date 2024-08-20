"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToJson = void 0;
var ToJson = /** @class */ (function () {
    function ToJson() {
    }
    ToJson.prototype.toJson = function () {
        return JSON.parse(JSON.stringify(this));
    };
    return ToJson;
}());
exports.ToJson = ToJson;
