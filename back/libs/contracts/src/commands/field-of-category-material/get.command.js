"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const field_of_category_material_related_entities_schema_1 = require("../../models/field-of-category-material/field-of-category-material-related-entities.schema");
const field_of_category_material_business_value_schema_1 = require("../../models/field-of-category-material/field-of-category-material-business-value.schema");
const FieldOfCategoryMaterialGetResponseEntitySchema = field_of_category_material_business_value_schema_1.FieldOfCategoryMaterialBusinessValueSchema.merge(field_of_category_material_related_entities_schema_1.FieldOfCategoryMaterialRelatedEntitiesSchema);
const FieldOfCategoryMaterialGetResponseSchema = zod_1.z
    .object({
    data: FieldOfCategoryMaterialGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldOfCategoryMaterialGetCommand;
(function (FieldOfCategoryMaterialGetCommand) {
    FieldOfCategoryMaterialGetCommand.BusinessValueSchema = field_of_category_material_business_value_schema_1.FieldOfCategoryMaterialBusinessValueSchema;
    FieldOfCategoryMaterialGetCommand.ResponseSchema = FieldOfCategoryMaterialGetResponseSchema;
    FieldOfCategoryMaterialGetCommand.ResponseEntitySchema = FieldOfCategoryMaterialGetResponseEntitySchema;
})(FieldOfCategoryMaterialGetCommand || (exports.FieldOfCategoryMaterialGetCommand = FieldOfCategoryMaterialGetCommand = {}));
