"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialUpdateNameCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const material_business_value_schema_1 = require("../../models/material/material-business-value.schema");
const material_related_entities_schema_1 = require("../../models/material/material-related-entities.schema");
const MaterialUpdateNameResponseEntitySchema = material_business_value_schema_1.MaterialBusinessValueSchema.merge(material_related_entities_schema_1.MaterialRelatedEntitiesSchema);
const MaterialUpdateNameRequestSchema = models_1.MaterialSchema.pick({
    name: true,
});
const MaterialUpdateNameResponseSchema = zod_1.z
    .object({
    data: MaterialUpdateNameResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var MaterialUpdateNameCommand;
(function (MaterialUpdateNameCommand) {
    MaterialUpdateNameCommand.RequestSchema = MaterialUpdateNameRequestSchema;
    MaterialUpdateNameCommand.ResponseSchema = MaterialUpdateNameResponseSchema;
    MaterialUpdateNameCommand.ResponseEntitySchema = MaterialUpdateNameResponseEntitySchema;
})(MaterialUpdateNameCommand || (exports.MaterialUpdateNameCommand = MaterialUpdateNameCommand = {}));
