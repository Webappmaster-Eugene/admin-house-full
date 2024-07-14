"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const material_business_value_schema_1 = require("../../models/material/material-business-value.schema");
const material_related_entities_schema_1 = require("../../models/material/material-related-entities.schema");
const MaterialGetAllResponseEntitySchema = zod_1.z.array(material_business_value_schema_1.MaterialBusinessValueSchema.merge(material_related_entities_schema_1.MaterialRelatedEntitiesSchema));
const MaterialGetAllResponseSchema = zod_1.z
    .object({
    data: MaterialGetAllResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var MaterialGetAllCommand;
(function (MaterialGetAllCommand) {
    MaterialGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    MaterialGetAllCommand.ResponseSchema = MaterialGetAllResponseSchema;
    MaterialGetAllCommand.ResponseEntitySchema = MaterialGetAllResponseEntitySchema;
})(MaterialGetAllCommand || (exports.MaterialGetAllCommand = MaterialGetAllCommand = {}));
