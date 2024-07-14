"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeGetAllCommand = void 0;
const zod_1 = require("zod");
const field_variants_for_selector_field_type_related_entities_schema_1 = require("../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-related-entities.schema");
const field_variants_for_selector_field_type_business_value_schema_1 = require("../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-business-value.schema");
const models_1 = require("../../models");
const FieldVariantsForSelectorFieldTypeGetAllResponseEntitySchema = zod_1.z.array(field_variants_for_selector_field_type_business_value_schema_1.FieldVariantsForSelectorFieldTypeBusinessValueSchema.merge(field_variants_for_selector_field_type_related_entities_schema_1.FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema));
const FieldVariantsForSelectorFieldTypeGetAllResponseSchema = zod_1.z
    .object({
    data: FieldVariantsForSelectorFieldTypeGetAllResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldVariantsForSelectorFieldTypeGetAllCommand;
(function (FieldVariantsForSelectorFieldTypeGetAllCommand) {
    FieldVariantsForSelectorFieldTypeGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseSchema = FieldVariantsForSelectorFieldTypeGetAllResponseSchema;
    FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseEntitySchema = FieldVariantsForSelectorFieldTypeGetAllResponseEntitySchema;
})(FieldVariantsForSelectorFieldTypeGetAllCommand || (exports.FieldVariantsForSelectorFieldTypeGetAllCommand = FieldVariantsForSelectorFieldTypeGetAllCommand = {}));
