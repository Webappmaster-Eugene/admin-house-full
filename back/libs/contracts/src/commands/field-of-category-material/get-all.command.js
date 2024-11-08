"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const field_of_category_material_business_value_schema_1 = require("../../models/field-of-category-material/field-of-category-material-business-value.schema");
const field_of_category_material_related_entities_schema_1 = require("../../models/field-of-category-material/field-of-category-material-related-entities.schema");
const FieldOfCategoryMaterialGetAllResponseEntitySchema = zod_1.z.array(field_of_category_material_business_value_schema_1.FieldOfCategoryMaterialBusinessValueSchema.merge(field_of_category_material_related_entities_schema_1.FieldOfCategoryMaterialRelatedEntitiesSchema));
const FieldOfCategoryMaterialGetAllResponseSchema = zod_1.z
    .object({
    data: FieldOfCategoryMaterialGetAllResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var FieldOfCategoryMaterialGetAllCommand;
(function (FieldOfCategoryMaterialGetAllCommand) {
    FieldOfCategoryMaterialGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    FieldOfCategoryMaterialGetAllCommand.ResponseSchema = FieldOfCategoryMaterialGetAllResponseSchema;
    FieldOfCategoryMaterialGetAllCommand.ResponseEntitySchema = FieldOfCategoryMaterialGetAllResponseEntitySchema;
})(FieldOfCategoryMaterialGetAllCommand || (exports.FieldOfCategoryMaterialGetAllCommand = FieldOfCategoryMaterialGetAllCommand = {}));
