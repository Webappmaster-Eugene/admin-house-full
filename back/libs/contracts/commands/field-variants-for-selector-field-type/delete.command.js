"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeDeleteCommand = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldVariantsForSelectorFieldTypeDeleteResponseEntitySchema = models_2.FieldVariantsForSelectorFieldTypeSchema.pick({
    description: true,
    value: true,
    handbookUuid: true,
    uuid: true,
    fieldOfCategoryMaterialUuid: true,
    lastChangeByUserUuid: true,
});
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
