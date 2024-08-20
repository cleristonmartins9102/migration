"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
var Repository = /** @class */ (function () {
    function Repository() {
    }
    Repository.prototype.toJson = function () {
        return JSON.parse(JSON.stringify(this));
    };
    return Repository;
}());
exports.Repository = Repository;
