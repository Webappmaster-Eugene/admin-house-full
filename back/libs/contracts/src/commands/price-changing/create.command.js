"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceChangingCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const price_changing_business_value_schema_1 = require("../../models/price-changing/price-changing-business-value.schema");
const price_changing_related_entities_schema_1 = require("../../models/price-changing/price-changing-related-entities.schema");
const PriceChangingCreateResponseEntitySchema = price_changing_business_value_schema_1.PriceChangingBusinessValueSchema.merge(price_changing_related_entities_schema_1.PriceChangingRelatedEntitiesSchema);
const PriceChangingCreateRequestSchema = models_1.PriceChangingSchema.pick({
    oldPrice: true,
    comment: true,
    newPrice: true,
    source: true,
});
const PriceChangingCreateResponseSchema = zod_1.z
    .object({
    data: PriceChangingCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var PriceChangingCreateCommand;
(function (PriceChangingCreateCommand) {
    PriceChangingCreateCommand.RequestSchema = PriceChangingCreateRequestSchema;
    PriceChangingCreateCommand.ResponseSchema = PriceChangingCreateResponseSchema;
    PriceChangingCreateCommand.ResponseEntitySchema = PriceChangingCreateResponseEntitySchema;
})(PriceChangingCreateCommand || (exports.PriceChangingCreateCommand = PriceChangingCreateCommand = {}));
