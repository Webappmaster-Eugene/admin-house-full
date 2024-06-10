"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldOfCategoryMaterialGetResponseEntitySchema = models_1.FieldOfCategoryMaterialSchema.pick({
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
const FieldOfCategoryMaterialGetResponseSchema = zod_1.z
    .object({
    data: FieldOfCategoryMaterialGetResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var FieldOfCategoryMaterialGetCommand;
(function (FieldOfCategoryMaterialGetCommand) {
    FieldOfCategoryMaterialGetCommand.ResponseSchema = FieldOfCategoryMaterialGetResponseSchema;
    FieldOfCategoryMaterialGetCommand.ResponseEntitySchema = FieldOfCategoryMaterialGetResponseEntitySchema;
})(FieldOfCategoryMaterialGetCommand || (exports.FieldOfCategoryMaterialGetCommand = FieldOfCategoryMaterialGetCommand = {}));
