"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialUpdateCategoryCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const material_business_value_schema_1 = require("../../models/material/material-business-value.schema");
const material_related_entities_schema_1 = require("../../models/material/material-related-entities.schema");
const MaterialUpdateCategoryResponseEntitySchema = material_business_value_schema_1.MaterialBusinessValueSchema.merge(material_related_entities_schema_1.MaterialRelatedEntitiesSchema);
const MaterialUpdateCategoryRequestSchema = models_1.MaterialSchema.pick({
    categoryMaterialUuid: true,
});
const MaterialUpdateCategoryResponseSchema = zod_1.z
    .object({
    data: MaterialUpdateCategoryResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var MaterialUpdateCategoryCommand;
(function (MaterialUpdateCategoryCommand) {
    MaterialUpdateCategoryCommand.RequestSchema = MaterialUpdateCategoryRequestSchema;
    MaterialUpdateCategoryCommand.ResponseSchema = MaterialUpdateCategoryResponseSchema;
    MaterialUpdateCategoryCommand.ResponseEntitySchema = MaterialUpdateCategoryResponseEntitySchema;
})(MaterialUpdateCategoryCommand || (exports.MaterialUpdateCategoryCommand = MaterialUpdateCategoryCommand = {}));
