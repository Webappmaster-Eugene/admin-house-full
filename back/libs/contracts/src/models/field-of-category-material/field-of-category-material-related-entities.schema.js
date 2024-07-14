"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const handbook_1 = require("../handbook");
const field_type_1 = require("../field-type");
const field_unit_measurement_1 = require("../field-unit-measurement");
const category_material_1 = require("../category-material");
const field_variants_for_selector_field_type_1 = require("../field-variants-for-selector-field-type");
exports.FieldOfCategoryMaterialRelatedEntitiesSchema = zod_1.z.object({
    categoryMaterial: category_material_1.CategoryMaterialSchema,
    handbook: handbook_1.HandbookSchema,
    fieldType: field_type_1.FieldTypeSchema,
    unitOfMeasurement: field_unit_measurement_1.FieldUnitMeasurementSchema,
    fieldVariantsForSelectorFieldType: zod_1.z.array(field_variants_for_selector_field_type_1.FieldVariantsForSelectorFieldTypeSchema).nullable().optional(),
});
