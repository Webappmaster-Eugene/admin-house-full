"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const material_business_value_schema_1 = require("../../models/material/material-business-value.schema");
const material_related_entities_schema_1 = require("../../models/material/material-related-entities.schema");
const MaterialGetResponseEntitySchema = material_business_value_schema_1.MaterialBusinessValueSchema.merge(material_related_entities_schema_1.MaterialRelatedEntitiesSchema);
const MaterialGetResponseSchema = zod_1.z
    .object({
    data: MaterialGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var MaterialGetCommand;
(function (MaterialGetCommand) {
    MaterialGetCommand.ResponseSchema = MaterialGetResponseSchema;
    MaterialGetCommand.ResponseEntitySchema = MaterialGetResponseEntitySchema;
})(MaterialGetCommand || (exports.MaterialGetCommand = MaterialGetCommand = {}));
