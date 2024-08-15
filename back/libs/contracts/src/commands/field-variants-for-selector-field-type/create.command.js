"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeCreateCommand = void 0;
const zod_1 = require("zod");
const field_variants_for_selector_field_type_related_entities_schema_1 = require("../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-related-entities.schema");
const models_1 = require("../../models");
const field_variants_for_selector_field_type_business_value_schema_1 = require("../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-business-value.schema");
const FieldVariantsForSelectorFieldTypeCreateResponseEntitySchema = field_variants_for_selector_field_type_business_value_schema_1.FieldVariantsForSelectorFieldTypeBusinessValueSchema.merge(field_variants_for_selector_field_type_related_entities_schema_1.FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema);
const FieldVariantsForSelectorFieldTypeCreateRequestSchema = models_1.FieldVariantsForSelectorFieldTypeSchema.pick({
    description: true,
    value: true,
    fieldVariantsForSelectorFieldTypeStatus: true,
});
const FieldVariantsForSelectorFieldTypeCreateResponseSchema = zod_1.z
    .object({
    data: FieldVariantsForSelectorFieldTypeCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldVariantsForSelectorFieldTypeCreateCommand;
(function (FieldVariantsForSelectorFieldTypeCreateCommand) {
    FieldVariantsForSelectorFieldTypeCreateCommand.RequestSchema = FieldVariantsForSelectorFieldTypeCreateRequestSchema;
    FieldVariantsForSelectorFieldTypeCreateCommand.ResponseSchema = FieldVariantsForSelectorFieldTypeCreateResponseSchema;
    FieldVariantsForSelectorFieldTypeCreateCommand.ResponseEntitySchema = FieldVariantsForSelectorFieldTypeCreateResponseEntitySchema;
})(FieldVariantsForSelectorFieldTypeCreateCommand || (exports.FieldVariantsForSelectorFieldTypeCreateCommand = FieldVariantsForSelectorFieldTypeCreateCommand = {}));
