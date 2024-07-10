"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const material_1 = require("../material");
const field_of_category_material_1 = require("../field-of-category-material");
const field_type_1 = require("../field-type");
const field_unit_measurement_1 = require("../field-unit-measurement");
const handbook_1 = require("../handbook");
exports.CharacteristicsMaterialRelatedEntitiesSchema = zod_1.z.object({
    material: material_1.MaterialBusinessValueSchema,
    fieldOfCategoryMaterial: field_of_category_material_1.FieldOfCategoryMaterialBusinessValueSchema,
    handbook: handbook_1.HandbookBusinessValueSchema,
    fieldType: field_type_1.FieldTypeBusinessValueSchema,
    fieldUnitMeasurement: field_unit_measurement_1.FieldUnitMeasurementBusinessValueSchema,
});
