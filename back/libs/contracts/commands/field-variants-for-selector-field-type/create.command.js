"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldVariantsForSelectorFieldTypeCreateResponseEntitySchema = models_2.FieldVariantsForSelectorFieldTypeSchema.pick({
    description: true,
    value: true,
    handbookUuid: true,
    uuid: true,
    fieldOfCategoryMaterialUuid: true,
    lastChangeByUserUuid: true,
});
const FieldVariantsForSelectorFieldTypeCreateRequestSchema = models_2.FieldVariantsForSelectorFieldTypeSchema.pick({
    description: true,
    value: true,
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
