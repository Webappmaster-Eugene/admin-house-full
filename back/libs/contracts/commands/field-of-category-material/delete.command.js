"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialDeleteCommand = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldOfCategoryMaterialDeleteResponseEntitySchema = models_1.FieldOfCategoryMaterialSchema.pick({
    name: true,
    comment: true,
    uniqueNameForTemplate: true,
    defaultValue: true,
    isRequired: true,
    unitOfMeasurementUuid: true,
    fieldTypeUuid: true,
    categoryMaterialUuid: true,
    lastChangeByUserUuid: true,
    handbookUuid: true,
    uuid: true,
});
const FieldOfCategoryMaterialDeleteResponseSchema = zod_1.z
    .object({
    data: FieldOfCategoryMaterialDeleteResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var FieldOfCategoryMaterialDeleteCommand;
(function (FieldOfCategoryMaterialDeleteCommand) {
    FieldOfCategoryMaterialDeleteCommand.RequestParamSchema = common_1.EntityUrlParamCommand.RequestUuidParamSchema;
    FieldOfCategoryMaterialDeleteCommand.ResponseSchema = FieldOfCategoryMaterialDeleteResponseSchema;
    FieldOfCategoryMaterialDeleteCommand.ResponseEntitySchema = FieldOfCategoryMaterialDeleteResponseEntitySchema;
})(FieldOfCategoryMaterialDeleteCommand || (exports.FieldOfCategoryMaterialDeleteCommand = FieldOfCategoryMaterialDeleteCommand = {}));
