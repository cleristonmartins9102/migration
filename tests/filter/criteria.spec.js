"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var criteria_1 = require("@/data/domain/features/load/filter/criteria");
var filter_1 = require("@/data/domain/features/load/filter/filter");
describe('Criteria', function () {
    it('', function () {
        var filter = new filter_1.Filter('name', '=', 1);
        var filter2 = new filter_1.Filter('surname', '=', 3);
        var criteria = new criteria_1.Criteria();
        var filter3 = new filter_1.Filter('lote', '=', 1);
        var filter4 = new filter_1.Filter('branch', '=', 3);
        var criteria1 = new criteria_1.Criteria();
        criteria1.add(filter3);
        criteria1.add(filter4);
        criteria.add(criteria1);
        console.log(criteria.dump());
    });
});
