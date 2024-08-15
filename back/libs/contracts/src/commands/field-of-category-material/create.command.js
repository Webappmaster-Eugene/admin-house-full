"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const field_of_category_material_business_value_schema_1 = require("../../models/field-of-category-material/field-of-category-material-business-value.schema");
const field_of_category_material_related_entities_schema_1 = require("../../models/field-of-category-material/field-of-category-material-related-entities.schema");
const field_of_category_material_data_with_category_materials_schema_1 = require("../../models/field-of-category-material/field-of-category-material-data-with-category-materials.schema");
const FieldOfCategoryMaterialCreateResponseEntitySchema = field_of_category_material_business_value_schema_1.FieldOfCategoryMaterialBusinessValueSchema.merge(field_of_category_material_related_entities_schema_1.FieldOfCategoryMaterialRelatedEntitiesSchema);
const FieldOfCategoryMaterialCreateRequestSchema = models_1.FieldOfCategoryMaterialSchema.pick({
    name: true,
    comment: true,
    fieldOfCategoryMaterialStatus: true,
    defaultValue: true,
    isRequired: true,
    unitOfMeasurementUuid: true,
    fieldTypeUuid: true,
}).merge(field_of_category_material_data_with_category_materials_schema_1.FieldOfCategoryMaterialDataWithCategoryMaterials);
const FieldOfCategoryMaterialCreateResponseSchema = zod_1.z
    .object({
    data: FieldOfCategoryMaterialCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldOfCategoryMaterialCreateCommand;
(function (FieldOfCategoryMaterialCreateCommand) {
    FieldOfCategoryMaterialCreateCommand.RequestSchema = FieldOfCategoryMaterialCreateRequestSchema;
    FieldOfCategoryMaterialCreateCommand.ResponseSchema = FieldOfCategoryMaterialCreateResponseSchema;
    FieldOfCategoryMaterialCreateCommand.ResponseEntitySchema = FieldOfCategoryMaterialCreateResponseEntitySchema;
})(FieldOfCategoryMaterialCreateCommand || (exports.FieldOfCategoryMaterialCreateCommand = FieldOfCategoryMaterialCreateCommand = {}));
