"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeBusinessValueSchema = void 0;
const field_variants_for_selector_field_type_schema_1 = require("./field-variants-for-selector-field-type.schema");
exports.FieldVariantsForSelectorFieldTypeBusinessValueSchema = field_variants_for_selector_field_type_schema_1.FieldVariantsForSelectorFieldTypeSchema.pick({
    description: true,
    value: true,
    handbookUuid: true,
    uuid: true,
    fieldOfCategoryMaterialUuid: true,
    lastChangeByUserUuid: true,
});
