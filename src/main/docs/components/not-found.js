"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
exports.notFound = {
    description: 'Not Found',
    content: {
        'application/json': {
            schema: {
                $ref: '#/components/schemas/Error'
            }
        }
    }
};
