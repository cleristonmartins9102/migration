"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeliveryModelStub = void 0;
var core_models_1 = require("@adamsfoodservice/core-models");
var make_fake_order_1 = require("./make-fake-order");
var shared_modules_1 = require("@adamsfoodservice/shared-modules");
var makeDeliveryModelStub = function () { return ({
    id: '1',
    order_id: '2',
    created_at: new shared_modules_1.default.DateTime.MomentAdapter(),
    updated_at: new shared_modules_1.default.DateTime.MomentAdapter(),
    created_by: '',
    updated_by: '',
    order: (0, make_fake_order_1.makeFakeOrder)(),
    vat_analysis: [{
            rate: 2,
            type: 'Z',
            value: 2,
            vat: 10
        }],
    motification: {
        product_id: '2',
        image: 'http://any.com',
        name: 'product2'
    },
    short_pick: {
        product_id: '1',
        ordered_quantity: 10,
        picked_quantity: 2,
        short_value: 1
    },
    status: core_models_1.DeliveryModel.Status.Accepted,
    deliveryDate: '2024',
    total: 10,
    value: 2,
    vat: 2,
    special_price: 44,
    placed_by_system: true
}); };
exports.makeDeliveryModelStub = makeDeliveryModelStub;
