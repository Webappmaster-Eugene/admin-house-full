"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const FieldVariantsForSelectorFieldTypeGetResponseEntitySchema = models_1.FieldVariantsForSelectorFieldTypeBusinessValueSchema.merge(models_1.FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema);
const FieldVariantsForSelectorFieldTypeGetResponseSchema = zod_1.z
    .object({
    data: FieldVariantsForSelectorFieldTypeGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FieldVariantsForSelectorFieldTypeGetCommand;
(function (FieldVariantsForSelectorFieldTypeGetCommand) {
    FieldVariantsForSelectorFieldTypeGetCommand.ResponseSchema = FieldVariantsForSelectorFieldTypeGetResponseSchema;
    FieldVariantsForSelectorFieldTypeGetCommand.ResponseEntitySchema = FieldVariantsForSelectorFieldTypeGetResponseEntitySchema;
})(FieldVariantsForSelectorFieldTypeGetCommand || (exports.FieldVariantsForSelectorFieldTypeGetCommand = FieldVariantsForSelectorFieldTypeGetCommand = {}));
