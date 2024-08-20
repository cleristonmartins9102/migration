"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
var shared_modules_1 = require("@adamsfoodservice/shared-modules");
exports.storage = {
    currentUser: new shared_modules_1.default.Str.AsyncStorage('currentUser')
};
