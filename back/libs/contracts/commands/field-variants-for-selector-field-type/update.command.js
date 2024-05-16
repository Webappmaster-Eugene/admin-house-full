"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldVariantsForSelectorFieldTypeUpdateRequestSchema = models_2.FieldVariantsForSelectorFieldTypeSchema.omit({
    createdAt: true,
    updatedAt: true,
    uuid: true,
}).partial();
const FieldVariantsForSelectorFieldTypeUpdateResponseSchema = zod_1.z
    .object({
    data: models_2.FieldVariantsForSelectorFieldTypeSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_1.ResponseClientSchema);
var FieldVariantsForSelectorFieldTypeUpdateCommand;
(function (FieldVariantsForSelectorFieldTypeUpdateCommand) {
    FieldVariantsForSelectorFieldTypeUpdateCommand.RequestSchema = FieldVariantsForSelectorFieldTypeUpdateRequestSchema;
    FieldVariantsForSelectorFieldTypeUpdateCommand.ResponseSchema = FieldVariantsForSelectorFieldTypeUpdateResponseSchema;
})(FieldVariantsForSelectorFieldTypeUpdateCommand || (exports.FieldVariantsForSelectorFieldTypeUpdateCommand = FieldVariantsForSelectorFieldTypeUpdateCommand = {}));
