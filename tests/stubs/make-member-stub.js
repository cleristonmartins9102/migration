"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFakeMember = void 0;
var faker_1 = require("@faker-js/faker");
var shared_modules_1 = require("@adamsfoodservice/shared-modules");
var makeFakeMember = function () {
    var fakeMember = {
        id: faker_1.faker.string.uuid(),
        user_account_id: '100',
        first_name: faker_1.faker.word.sample(),
        last_name: faker_1.faker.word.sample(),
        customer_type: faker_1.faker.word.sample(),
        disabled: true,
        email_verified: true,
        internal_id: faker_1.faker.string.uuid(),
        invoiced_by: faker_1.faker.word.sample(),
        payroll_number: faker_1.faker.number.int(),
        role: faker_1.faker.word.sample(),
        branch: {
            internal_id: faker_1.faker.number.int(),
            name: 'company'
        },
        wallet: {
            balance: 1
        },
        location: {
            address: faker_1.faker.location.streetAddress(),
            number: faker_1.faker.number.int().toString(),
            postcode: faker_1.faker.location.zipCode(),
            city: faker_1.faker.location.city()
        },
        shop: {
            name: 'company'
        },
        settings: {
            can_deliver: true,
            delivery_day_1: faker_1.faker.date.weekday(),
            delivery_day_2: faker_1.faker.date.weekday(),
            delivery_day_3: faker_1.faker.date.weekday(),
            delivery_day_4: faker_1.faker.date.weekday(),
            delivery_day_5: faker_1.faker.date.weekday(),
            delivery_day_6: faker_1.faker.date.weekday(),
            delivery_day_7: faker_1.faker.date.weekday(),
            push_asked: true,
            transac_marketing_notifications: {
                marketing: {
                    email: true,
                    push: true,
                    sms: true
                },
                transactional: {
                    email: true,
                    push: true,
                    sms: true
                }
            }
        },
        contact: {
            email: faker_1.faker.internet.email(),
            phone_number: '222'
        },
        web_parent: faker_1.faker.number.int(),
        updated_at: new shared_modules_1.default.DateTime.MomentAdapter(),
        created_at: new shared_modules_1.default.DateTime.MomentAdapter()
    };
    return fakeMember;
};
exports.makeFakeMember = makeFakeMember;
