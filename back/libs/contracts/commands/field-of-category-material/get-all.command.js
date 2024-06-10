"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldOfCategoryMaterialGetAllResponseEntitySchema = zod_1.z.array(models_1.FieldOfCategoryMaterialSchema.pick({
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
}));
const FieldOfCategoryMaterialGetAllResponseSchema = zod_1.z
    .object({
    data: FieldOfCategoryMaterialGetAllResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var FieldOfCategoryMaterialGetAllCommand;
(function (FieldOfCategoryMaterialGetAllCommand) {
    FieldOfCategoryMaterialGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    FieldOfCategoryMaterialGetAllCommand.ResponseSchema = FieldOfCategoryMaterialGetAllResponseSchema;
    FieldOfCategoryMaterialGetAllCommand.ResponseEntitySchema = FieldOfCategoryMaterialGetAllResponseEntitySchema;
})(FieldOfCategoryMaterialGetAllCommand || (exports.FieldOfCategoryMaterialGetAllCommand = FieldOfCategoryMaterialGetAllCommand = {}));
