"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldVariantsForSelectorFieldTypeCreateRequestSchema = models_2.FieldVariantsForSelectorFieldTypeSchema.omit({
    uuid: true,
    createdAt: true,
    updatedAt: true,
});
const FieldVariantsForSelectorFieldTypeCreateResponseSchema = zod_1.z
    .object({
    data: models_2.FieldVariantsForSelectorFieldTypeSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_1.ResponseClientSchema);
var FieldVariantsForSelectorFieldTypeCreateCommand;
(function (FieldVariantsForSelectorFieldTypeCreateCommand) {
    FieldVariantsForSelectorFieldTypeCreateCommand.RequestSchema = FieldVariantsForSelectorFieldTypeCreateRequestSchema;
    FieldVariantsForSelectorFieldTypeCreateCommand.ResponseSchema = FieldVariantsForSelectorFieldTypeCreateResponseSchema;
})(FieldVariantsForSelectorFieldTypeCreateCommand || (exports.FieldVariantsForSelectorFieldTypeCreateCommand = FieldVariantsForSelectorFieldTypeCreateCommand = {}));
