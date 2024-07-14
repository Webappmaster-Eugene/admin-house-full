"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const material_business_value_schema_1 = require("../../models/material/material-business-value.schema");
const material_related_entities_schema_1 = require("../../models/material/material-related-entities.schema");
const models_1 = require("../../models");
const MaterialDeleteResponseEntitySchema = material_business_value_schema_1.MaterialBusinessValueSchema.merge(material_related_entities_schema_1.MaterialRelatedEntitiesSchema);
const MaterialDeleteResponseSchema = zod_1.z
    .object({
    data: MaterialDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var MaterialDeleteCommand;
(function (MaterialDeleteCommand) {
    MaterialDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    MaterialDeleteCommand.ResponseSchema = MaterialDeleteResponseSchema;
    MaterialDeleteCommand.ResponseEntitySchema = MaterialDeleteResponseEntitySchema;
})(MaterialDeleteCommand || (exports.MaterialDeleteCommand = MaterialDeleteCommand = {}));
