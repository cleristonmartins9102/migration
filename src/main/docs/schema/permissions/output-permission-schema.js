"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputPermissionSchema = void 0;
exports.outputPermissionSchema = {
    type: 'object',
    properties: {
        subject: {
            type: 'string'
        },
        action: {
            type: 'string'
        }
    }
};
