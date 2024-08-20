"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_alias_1 = require("module-alias");
module_alias_1.default.addAlias('@', __dirname + '/../../src');
var app_1 = require("./config/app");
var port = 5050;
(0, app_1.createApp)().then(function (app) {
    app.listen(port, function () { console.log("Running on ".concat(port)); });
});
