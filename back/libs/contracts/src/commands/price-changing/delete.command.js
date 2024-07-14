"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceChangingDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const price_changing_related_entities_schema_1 = require("../../models/price-changing/price-changing-related-entities.schema");
const price_changing_business_value_schema_1 = require("../../models/price-changing/price-changing-business-value.schema");
const PriceChangingDeleteResponseEntitySchema = price_changing_business_value_schema_1.PriceChangingBusinessValueSchema.merge(price_changing_related_entities_schema_1.PriceChangingRelatedEntitiesSchema);
const PriceChangingDeleteResponseSchema = zod_1.z
    .object({
    data: PriceChangingDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var PriceChangingDeleteCommand;
(function (PriceChangingDeleteCommand) {
    PriceChangingDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    PriceChangingDeleteCommand.ResponseSchema = PriceChangingDeleteResponseSchema;
    PriceChangingDeleteCommand.ResponseEntitySchema = PriceChangingDeleteResponseEntitySchema;
})(PriceChangingDeleteCommand || (exports.PriceChangingDeleteCommand = PriceChangingDeleteCommand = {}));
