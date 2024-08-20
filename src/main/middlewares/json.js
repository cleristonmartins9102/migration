"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonMiddleware = void 0;
var express_1 = require("express");
var jsonMiddleware = function (app) {
    return function (req, res, next) {
        try {
            (0, express_1.json)()(req, res, next);
        }
        catch (error) {
            next(error);
        }
        app.use(function (err, req, res, next) {
            if (err instanceof SyntaxError && 'body' in err) {
                var error = err;
                return res.status(error.status).json({ error: 'Invalid JSON' });
            }
            next();
        });
    };
};
exports.jsonMiddleware = jsonMiddleware;
