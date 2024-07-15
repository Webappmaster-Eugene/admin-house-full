"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeGetCommand = void 0;
const zod_1 = require("zod");
const field_variants_for_selector_field_type_related_entities_schema_1 = require("../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-related-entities.schema");
const models_1 = require("../../models");
const field_variants_for_selector_field_type_business_value_schema_1 = require("../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-business-value.schema");
const FieldVariantsForSelectorFieldTypeGetResponseEntitySchema = field_variants_for_selector_field_type_business_value_schema_1.FieldVariantsForSelectorFieldTypeBusinessValueSchema.merge(field_variants_for_selector_field_type_related_entities_schema_1.FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema);
const FieldVariantsForSelectorFieldTypeGetResponseSchema = zod_1.z
    .object({
    data: FieldVariantsForSelectorFieldTypeGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldVariantsForSelectorFieldTypeGetCommand;
(function (FieldVariantsForSelectorFieldTypeGetCommand) {
    FieldVariantsForSelectorFieldTypeGetCommand.BusinessValueSchema = field_variants_for_selector_field_type_business_value_schema_1.FieldVariantsForSelectorFieldTypeBusinessValueSchema;
    FieldVariantsForSelectorFieldTypeGetCommand.ResponseSchema = FieldVariantsForSelectorFieldTypeGetResponseSchema;
    FieldVariantsForSelectorFieldTypeGetCommand.ResponseEntitySchema = FieldVariantsForSelectorFieldTypeGetResponseEntitySchema;
})(FieldVariantsForSelectorFieldTypeGetCommand || (exports.FieldVariantsForSelectorFieldTypeGetCommand = FieldVariantsForSelectorFieldTypeGetCommand = {}));
