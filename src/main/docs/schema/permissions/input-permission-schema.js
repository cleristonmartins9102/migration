"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputPermissionSchema = void 0;
exports.inputPermissionSchema = {
    type: 'object',
    properties: {
        subject: {
            type: 'string'
        },
        action: {
            type: 'string',
            enum: ['read', 'create', 'delete', 'update']
        }
    }
};
