"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
var swagger_ui_express_1 = require("swagger-ui-express");
var swagger_jsdoc_1 = require("swagger-jsdoc");
var components_1 = require("./components");
var member_schema_1 = require("./schema/member/member-schema");
var setupSwagger = function (app) {
    var swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Member Service API',
                version: '1.0.0',
                description: 'Documentation detailing API specifications'
            },
            components: {
                schemas: {
                    NotFound: components_1.notFound,
                    Error: components_1.errorSchema,
                    BadRequest: components_1.badRequest,
                    ServerError: components_1.serverError,
                    Unauthorized: components_1.unauthorized,
                    memberResponseSchema: member_schema_1.memberResponseSchema
                }
            }
        },
        apis: ['./src/main/routers/**/*.ts'] // Ensure this points to your route files
    };
    var swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
    app.use('/api-json', function (req, res) {
        res.json(swaggerDocs);
    });
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
};
exports.setupSwagger = setupSwagger;
