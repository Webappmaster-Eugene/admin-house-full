"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const category_material_business_value_schema_1 = require("../category-material/category-material-business-value.schema");
const field_variants_for_selector_field_type_business_value_schema_1 = require("../field-variants-for-selector-field-type/field-variants-for-selector-field-type-business-value.schema");
const field_unit_measurement_business_value_schema_1 = require("../field-unit-measurement/field-unit-measurement-business-value.schema");
const field_type_business_value_schema_1 = require("../field-type/field-type-business-value.schema");
const handbook_business_value_schema_1 = require("../handbook/handbook-business-value.schema");
exports.FieldOfCategoryMaterialRelatedEntitiesSchema = zod_1.z.object({
    handbook: handbook_business_value_schema_1.HandbookBusinessValueSchema,
    categoriesMaterial: zod_1.z.array(category_material_business_value_schema_1.CategoryMaterialBusinessValueSchema).nullable().optional(),
    categoriesMaterialsTemplatesIncludesThisField: zod_1.z.array(category_material_business_value_schema_1.CategoryMaterialBusinessValueSchema).nullable().optional(),
    fieldType: field_type_business_value_schema_1.FieldTypeBusinessValueSchema,
    unitOfMeasurement: field_unit_measurement_business_value_schema_1.FieldUnitMeasurementBusinessValueSchema,
    fieldVariantsForSelectorFieldType: zod_1.z.array(field_variants_for_selector_field_type_business_value_schema_1.FieldVariantsForSelectorFieldTypeBusinessValueSchema).nullable().optional(),
});
