"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceChangingBusinessValueSchema = void 0;
const price_changing_schema_1 = require("./price-changing.schema");
exports.PriceChangingBusinessValueSchema = price_changing_schema_1.PriceChangingSchema.pick({
    oldPrice: true,
    comment: true,
    newPrice: true,
    source: true,
    uuid: true,
    lastChangeByUserUuid: true,
    materialUuid: true,
});
