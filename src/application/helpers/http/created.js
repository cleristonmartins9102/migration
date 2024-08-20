"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.created = void 0;
var shared_modules_1 = require("@adamsfoodservice/shared-modules");
var created = function (data) {
    var createdAt = data.created_at;
    var updatedAt = data.updated_at;
    if (createdAt && createdAt instanceof shared_modules_1.default.DateTime.MomentAdapter) {
        data.created_at = data.created_at.format('YYYY-MM-DD HH:mm:ss');
    }
    if (updatedAt && updatedAt instanceof shared_modules_1.default.DateTime.MomentAdapter) {
        data.updated_at = data.updated_at.format('YYYY-MM-DD HH:mm:ss');
    }
    return { statusCode: 201, body: data };
};
exports.created = created;
