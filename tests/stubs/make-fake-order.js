"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFakeOrder = void 0;
var make_member_stub_1 = require("./make-member-stub");
var makeFakeOrder = function (member) { return ({
    id: '1',
    member: __assign(__assign({}, (0, make_member_stub_1.makeFakeMember)()), member),
    internal_id: '2',
    optimize_h: true,
    timeslot: {
        date: '',
        day: '1',
        from: '3',
        to: '4'
    },
    status: 'activated',
    order_id: '2',
    invoice_id: '3',
    price_including_vat: 33,
    price_excluding_vat: 3,
    vat: 1,
    due: 1,
    items: [{
            product: {}
        }],
    picking_branch: 'pb',
    sales_branch: 'sb',
    date_of_invoice: 'di',
    time: new Date(),
    sale_type: '',
    created_at: new Date(),
    updated_at: new Date()
}); };
exports.makeFakeOrder = makeFakeOrder;
