"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeUpdateCommand = void 0;
const zod_1 = require("zod");
const field_variants_for_selector_field_type_related_entities_schema_1 = require("../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-related-entities.schema");
const models_1 = require("../../models");
const field_variants_for_selector_field_type_business_value_schema_1 = require("../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-business-value.schema");
const FieldVariantsForSelectorFieldTypeUpdateResponseEntitySchema = field_variants_for_selector_field_type_business_value_schema_1.FieldVariantsForSelectorFieldTypeBusinessValueSchema.merge(field_variants_for_selector_field_type_related_entities_schema_1.FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema);
const FieldVariantsForSelectorFieldTypeUpdateRequestSchema = models_1.FieldVariantsForSelectorFieldTypeSchema.pick({
    description: true,
    value: true,
}).partial();
const FieldVariantsForSelectorFieldTypeUpdateResponseSchema = zod_1.z
    .object({
    data: FieldVariantsForSelectorFieldTypeUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldVariantsForSelectorFieldTypeUpdateCommand;
(function (FieldVariantsForSelectorFieldTypeUpdateCommand) {
    FieldVariantsForSelectorFieldTypeUpdateCommand.RequestSchema = FieldVariantsForSelectorFieldTypeUpdateRequestSchema;
    FieldVariantsForSelectorFieldTypeUpdateCommand.ResponseSchema = FieldVariantsForSelectorFieldTypeUpdateResponseSchema;
    FieldVariantsForSelectorFieldTypeUpdateCommand.ResponseEntitySchema = FieldVariantsForSelectorFieldTypeUpdateResponseEntitySchema;
})(FieldVariantsForSelectorFieldTypeUpdateCommand || (exports.FieldVariantsForSelectorFieldTypeUpdateCommand = FieldVariantsForSelectorFieldTypeUpdateCommand = {}));
