"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorized = void 0;
exports.unauthorized = {
    description: 'Unhauthorized',
    content: {
        'application/json': {
            schema: {
                $ref: '#/components/schemas/Error'
            }
        }
    }
};
