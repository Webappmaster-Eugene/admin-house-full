"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeDeleteCommand = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldVariantsForSelectorFieldTypeDeleteResponseSchema = zod_1.z
    .object({
    data: models_2.FieldVariantsForSelectorFieldTypeSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_1.ResponseClientSchema);
var FieldVariantsForSelectorFieldTypeDeleteCommand;
(function (FieldVariantsForSelectorFieldTypeDeleteCommand) {
    FieldVariantsForSelectorFieldTypeDeleteCommand.RequestParamSchema = common_1.EntityUrlParamCommand.RequestUuidParamSchema;
    FieldVariantsForSelectorFieldTypeDeleteCommand.ResponseSchema = FieldVariantsForSelectorFieldTypeDeleteResponseSchema;
})(FieldVariantsForSelectorFieldTypeDeleteCommand || (exports.FieldVariantsForSelectorFieldTypeDeleteCommand = FieldVariantsForSelectorFieldTypeDeleteCommand = {}));
