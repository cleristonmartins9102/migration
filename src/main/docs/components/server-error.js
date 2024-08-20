"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = void 0;
exports.serverError = {
    description: 'Server Error',
    content: {
        'application/json': {
            schema: {
                $ref: '#/components/schemas/Error'
            }
        }
    }
};
