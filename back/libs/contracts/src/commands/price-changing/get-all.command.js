"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceChangingGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const price_changing_related_entities_schema_1 = require("../../models/price-changing/price-changing-related-entities.schema");
const price_changing_business_value_schema_1 = require("../../models/price-changing/price-changing-business-value.schema");
const PriceChangingGetAllResponseEntitySchema = zod_1.z.array(price_changing_business_value_schema_1.PriceChangingBusinessValueSchema.merge(price_changing_related_entities_schema_1.PriceChangingRelatedEntitiesSchema));
const PriceChangingGetAllResponseSchema = zod_1.z
    .object({
    data: PriceChangingGetAllResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var PriceChangingGetAllCommand;
(function (PriceChangingGetAllCommand) {
    PriceChangingGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    PriceChangingGetAllCommand.ResponseSchema = PriceChangingGetAllResponseSchema;
    PriceChangingGetAllCommand.ResponseEntitySchema = PriceChangingGetAllResponseEntitySchema;
})(PriceChangingGetAllCommand || (exports.PriceChangingGetAllCommand = PriceChangingGetAllCommand = {}));
