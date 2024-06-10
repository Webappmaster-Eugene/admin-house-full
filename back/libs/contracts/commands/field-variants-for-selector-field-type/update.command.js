"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldVariantsForSelectorFieldTypeUpdateResponseEntitySchema = models_2.FieldVariantsForSelectorFieldTypeSchema.pick({
    description: true,
    value: true,
    handbookUuid: true,
    uuid: true,
    fieldOfCategoryMaterialUuid: true,
    lastChangeByUserUuid: true,
});
const FieldVariantsForSelectorFieldTypeUpdateRequestSchema = models_2.FieldVariantsForSelectorFieldTypeSchema.pick({
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
