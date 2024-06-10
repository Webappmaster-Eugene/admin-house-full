"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldVariantsForSelectorFieldTypeGetResponseEntitySchema = models_2.FieldVariantsForSelectorFieldTypeSchema.pick({
    description: true,
    value: true,
    handbookUuid: true,
    uuid: true,
    fieldOfCategoryMaterialUuid: true,
    lastChangeByUserUuid: true,
});
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
