"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceChangingGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const price_changing_business_value_schema_1 = require("../../models/price-changing/price-changing-business-value.schema");
const price_changing_related_entities_schema_1 = require("../../models/price-changing/price-changing-related-entities.schema");
const PriceChangingGetResponseEntitySchema = price_changing_business_value_schema_1.PriceChangingBusinessValueSchema.merge(price_changing_related_entities_schema_1.PriceChangingRelatedEntitiesSchema);
const PriceChangingGetResponseSchema = zod_1.z
    .object({
    data: PriceChangingGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var PriceChangingGetCommand;
(function (PriceChangingGetCommand) {
    PriceChangingGetCommand.BusinessValueSchema = price_changing_business_value_schema_1.PriceChangingBusinessValueSchema;
    PriceChangingGetCommand.ResponseSchema = PriceChangingGetResponseSchema;
    PriceChangingGetCommand.ResponseEntitySchema = PriceChangingGetResponseEntitySchema;
})(PriceChangingGetCommand || (exports.PriceChangingGetCommand = PriceChangingGetCommand = {}));
