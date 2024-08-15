"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const field_of_category_material_related_entities_schema_1 = require("../../models/field-of-category-material/field-of-category-material-related-entities.schema");
const field_of_category_material_business_value_schema_1 = require("../../models/field-of-category-material/field-of-category-material-business-value.schema");
const field_of_category_material_data_with_category_materials_schema_1 = require("../../models/field-of-category-material/field-of-category-material-data-with-category-materials.schema");
const FieldOfCategoryMaterialUpdateResponseEntitySchema = field_of_category_material_business_value_schema_1.FieldOfCategoryMaterialBusinessValueSchema.merge(field_of_category_material_related_entities_schema_1.FieldOfCategoryMaterialRelatedEntitiesSchema);
const FieldOfCategoryMaterialUpdateRequestSchema = models_1.FieldOfCategoryMaterialSchema.pick({
    name: true,
    comment: true,
    defaultValue: true,
    fieldOfCategoryMaterialStatus: true,
    unitOfMeasurementUuid: true,
    isRequired: true,
    fieldTypeUuid: true,
    // DOC проверить правильность функции изменять тип поля (строка, число или select)
})
    .partial()
    .merge(field_of_category_material_data_with_category_materials_schema_1.FieldOfCategoryMaterialDataWithCategoryMaterials);
const FieldOfCategoryMaterialUpdateResponseSchema = zod_1.z
    .object({
    data: FieldOfCategoryMaterialUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldOfCategoryMaterialUpdateCommand;
(function (FieldOfCategoryMaterialUpdateCommand) {
    FieldOfCategoryMaterialUpdateCommand.RequestSchema = FieldOfCategoryMaterialUpdateRequestSchema;
    FieldOfCategoryMaterialUpdateCommand.ResponseSchema = FieldOfCategoryMaterialUpdateResponseSchema;
    FieldOfCategoryMaterialUpdateCommand.ResponseEntitySchema = FieldOfCategoryMaterialUpdateResponseEntitySchema;
})(FieldOfCategoryMaterialUpdateCommand || (exports.FieldOfCategoryMaterialUpdateCommand = FieldOfCategoryMaterialUpdateCommand = {}));
