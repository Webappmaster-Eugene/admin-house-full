"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeDeleteCommand = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
const field_variants_for_selector_field_type_related_entities_schema_1 = require("../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-related-entities.schema");
const field_variants_for_selector_field_type_business_value_schema_1 = require("../../models/field-variants-for-selector-field-type/field-variants-for-selector-field-type-business-value.schema");
const models_1 = require("../../models");
const FieldVariantsForSelectorFieldTypeDeleteResponseEntitySchema = field_variants_for_selector_field_type_business_value_schema_1.FieldVariantsForSelectorFieldTypeBusinessValueSchema.merge(field_variants_for_selector_field_type_related_entities_schema_1.FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema);
const FieldVariantsForSelectorFieldTypeDeleteResponseSchema = zod_1.z
    .object({
    data: FieldVariantsForSelectorFieldTypeDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldVariantsForSelectorFieldTypeDeleteCommand;
(function (FieldVariantsForSelectorFieldTypeDeleteCommand) {
    FieldVariantsForSelectorFieldTypeDeleteCommand.RequestParamSchema = common_1.EntityUrlParamCommand.RequestUuidParamSchema;
    FieldVariantsForSelectorFieldTypeDeleteCommand.ResponseSchema = FieldVariantsForSelectorFieldTypeDeleteResponseSchema;
    FieldVariantsForSelectorFieldTypeDeleteCommand.ResponseEntitySchema = FieldVariantsForSelectorFieldTypeDeleteResponseEntitySchema;
})(FieldVariantsForSelectorFieldTypeDeleteCommand || (exports.FieldVariantsForSelectorFieldTypeDeleteCommand = FieldVariantsForSelectorFieldTypeDeleteCommand = {}));
