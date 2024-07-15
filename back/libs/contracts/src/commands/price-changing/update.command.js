"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceChangingUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const price_changing_business_value_schema_1 = require("../../models/price-changing/price-changing-business-value.schema");
const price_changing_related_entities_schema_1 = require("../../models/price-changing/price-changing-related-entities.schema");
const PriceChangingUpdateResponseEntitySchema = price_changing_business_value_schema_1.PriceChangingBusinessValueSchema.merge(price_changing_related_entities_schema_1.PriceChangingRelatedEntitiesSchema);
const PriceChangingUpdateRequestSchema = models_1.PriceChangingSchema.pick({
    source: true,
    comment: true,
    newPrice: true,
    oldPrice: true,
}).partial();
const PriceChangingUpdateResponseSchema = zod_1.z
    .object({
    data: PriceChangingUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var PriceChangingUpdateCommand;
(function (PriceChangingUpdateCommand) {
    PriceChangingUpdateCommand.RequestSchema = PriceChangingUpdateRequestSchema;
    PriceChangingUpdateCommand.ResponseSchema = PriceChangingUpdateResponseSchema;
    PriceChangingUpdateCommand.ResponseEntitySchema = PriceChangingUpdateResponseEntitySchema;
})(PriceChangingUpdateCommand || (exports.PriceChangingUpdateCommand = PriceChangingUpdateCommand = {}));
