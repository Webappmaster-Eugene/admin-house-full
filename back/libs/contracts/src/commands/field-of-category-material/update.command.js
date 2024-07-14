"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const field_of_category_material_related_entities_schema_1 = require("../../models/field-of-category-material/field-of-category-material-related-entities.schema");
const field_of_category_material_business_value_schema_1 = require("../../models/field-of-category-material/field-of-category-material-business-value.schema");
const FieldOfCategoryMaterialUpdateResponseEntitySchema = field_of_category_material_business_value_schema_1.FieldOfCategoryMaterialBusinessValueSchema.merge(field_of_category_material_related_entities_schema_1.FieldOfCategoryMaterialRelatedEntitiesSchema);
const FieldOfCategoryMaterialUpdateRequestSchema = models_1.FieldOfCategoryMaterialSchema.pick({
    name: true,
    comment: true,
    uniqueNameForTemplate: true,
    defaultValue: true,
    unitOfMeasurementUuid: true,
    // DOC пока не дадим пользователю изменять этип поля
    //isRequired: true,
    // fieldTypeUuid: true,
});
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
