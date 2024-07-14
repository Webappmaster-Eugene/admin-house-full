"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialDeleteCommand = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
const models_1 = require("../../models");
const field_of_category_material_related_entities_schema_1 = require("../../models/field-of-category-material/field-of-category-material-related-entities.schema");
const field_of_category_material_business_value_schema_1 = require("../../models/field-of-category-material/field-of-category-material-business-value.schema");
const FieldOfCategoryMaterialDeleteResponseEntitySchema = field_of_category_material_business_value_schema_1.FieldOfCategoryMaterialBusinessValueSchema.merge(field_of_category_material_related_entities_schema_1.FieldOfCategoryMaterialRelatedEntitiesSchema);
const FieldOfCategoryMaterialDeleteResponseSchema = zod_1.z
    .object({
    data: FieldOfCategoryMaterialDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldOfCategoryMaterialDeleteCommand;
(function (FieldOfCategoryMaterialDeleteCommand) {
    FieldOfCategoryMaterialDeleteCommand.RequestParamSchema = common_1.EntityUrlParamCommand.RequestUuidParamSchema;
    FieldOfCategoryMaterialDeleteCommand.ResponseSchema = FieldOfCategoryMaterialDeleteResponseSchema;
    FieldOfCategoryMaterialDeleteCommand.ResponseEntitySchema = FieldOfCategoryMaterialDeleteResponseEntitySchema;
})(FieldOfCategoryMaterialDeleteCommand || (exports.FieldOfCategoryMaterialDeleteCommand = FieldOfCategoryMaterialDeleteCommand = {}));
