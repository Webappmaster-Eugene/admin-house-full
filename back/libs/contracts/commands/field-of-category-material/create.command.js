"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldOfCategoryMaterialCreateResponseEntitySchema = models_1.FieldOfCategoryMaterialBusinessValueSchema.merge(models_1.FieldOfCategoryMaterialRelatedEntitiesSchema);
const FieldOfCategoryMaterialCreateRequestSchema = models_1.FieldOfCategoryMaterialSchema.pick({
    name: true,
    comment: true,
    uniqueNameForTemplate: true,
    defaultValue: true,
    isRequired: true,
    unitOfMeasurementUuid: true,
    fieldTypeUuid: true,
});
const FieldOfCategoryMaterialCreateResponseSchema = zod_1.z
    .object({
    data: FieldOfCategoryMaterialCreateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var FieldOfCategoryMaterialCreateCommand;
(function (FieldOfCategoryMaterialCreateCommand) {
    FieldOfCategoryMaterialCreateCommand.RequestSchema = FieldOfCategoryMaterialCreateRequestSchema;
    FieldOfCategoryMaterialCreateCommand.ResponseSchema = FieldOfCategoryMaterialCreateResponseSchema;
    FieldOfCategoryMaterialCreateCommand.ResponseEntitySchema = FieldOfCategoryMaterialCreateResponseEntitySchema;
})(FieldOfCategoryMaterialCreateCommand || (exports.FieldOfCategoryMaterialCreateCommand = FieldOfCategoryMaterialCreateCommand = {}));
