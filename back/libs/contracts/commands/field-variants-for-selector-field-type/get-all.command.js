"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const FieldVariantsForSelectorFieldTypeGetAllResponseEntitySchema = zod_1.z.array(models_1.FieldVariantsForSelectorFieldTypeBusinessValueSchema.merge(models_1.FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema));
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
