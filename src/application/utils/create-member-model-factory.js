"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMemberModelFactory = void 0;
var models_1 = require("@/data/domain/models");
var CreateMemberModelFactory = /** @class */ (function () {
    function CreateMemberModelFactory() {
    }
    CreateMemberModelFactory.factory = function (body) {
        switch (body.customer_type) {
            case 'Z05': {
                return new models_1.CreateMemberHouseHold({
                    wallet: { balance: 0 },
                    user_account_id: body.id,
                    first_name: body === null || body === void 0 ? void 0 : body.first_name,
                    last_name: body === null || body === void 0 ? void 0 : body.last_name,
                    customer_type: body === null || body === void 0 ? void 0 : body.customer_type,
                    disabled: true,
                    email_verified: true,
                    internal_id: '0',
                    invoiced_by: '',
                    payroll_number: 1,
                    role: '',
                    branch: {
                        internal_id: '',
                        name: body.branch_id
                    },
                    location: {
                        address: body.shop_address,
                        postcode: body.postcode,
                        city: body.town,
                        number: ''
                    },
                    settings: {
                        can_deliver: true,
                        push_asked: true,
                        transac_marketing_notifications: {
                            marketing: {
                                email: body.push_marketing,
                                push: body.sms_marketing,
                                sms: body.sms_marketing
                            },
                            transactional: {
                                email: true,
                                push: body.push,
                                sms: body.sms
                            }
                        },
                    },
                    contact: {
                        phone_number: body.phone_number,
                        email: body.email
                    },
                    web_parent: 1
                });
            }
            default: {
                return new models_1.CreateMemberShop({
                    wallet: { balance: 0 },
                    user_account_id: body.id,
                    first_name: body === null || body === void 0 ? void 0 : body.first_name,
                    last_name: body === null || body === void 0 ? void 0 : body.last_name,
                    customer_type: body === null || body === void 0 ? void 0 : body.customer_type,
                    disabled: true,
                    email_verified: true,
                    internal_id: '0',
                    invoiced_by: '',
                    role: '',
                    branch: {
                        internal_id: '',
                        name: body.branch_id
                    },
                    location: {
                        address: body.shop_address,
                        postcode: body.postcode,
                        city: body.town,
                        number: ''
                    },
                    shop: {
                        name: body.shop_name
                    },
                    settings: {
                        can_deliver: true,
                        push_asked: true,
                        transac_marketing_notifications: {
                            marketing: {
                                email: body.push_marketing,
                                push: body.sms_marketing,
                                sms: body.sms_marketing
                            },
                            transactional: {
                                email: true,
                                push: body.push,
                                sms: body.sms
                            }
                        },
                    },
                    contact: {
                        phone_number: body.phone_number,
                        email: body.email
                    },
                    web_parent: 1
                });
            }
        }
    };
    return CreateMemberModelFactory;
}());
exports.CreateMemberModelFactory = CreateMemberModelFactory;
