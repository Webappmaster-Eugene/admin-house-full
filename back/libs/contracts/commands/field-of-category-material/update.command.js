"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldOfCategoryMaterialUpdateResponseEntitySchema = models_1.FieldOfCategoryMaterialBusinessValueSchema.merge(models_1.FieldOfCategoryMaterialRelatedEntitiesSchema);
const FieldOfCategoryMaterialUpdateRequestSchema = models_1.FieldOfCategoryMaterialSchema.pick({
    name: true,
    comment: true,
    uniqueNameForTemplate: true,
    defaultValue: true,
    unitOfMeasurementUuid: true,
    // DOC пока не дадим пользователю изменять этип поля
    //isRequired: true,
    // fieldTypeUuid: true,
}).partial();
const FieldOfCategoryMaterialUpdateResponseSchema = zod_1.z
    .object({
    data: FieldOfCategoryMaterialUpdateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var FieldOfCategoryMaterialUpdateCommand;
(function (FieldOfCategoryMaterialUpdateCommand) {
    FieldOfCategoryMaterialUpdateCommand.RequestSchema = FieldOfCategoryMaterialUpdateRequestSchema;
    FieldOfCategoryMaterialUpdateCommand.ResponseSchema = FieldOfCategoryMaterialUpdateResponseSchema;
    FieldOfCategoryMaterialUpdateCommand.ResponseEntitySchema = FieldOfCategoryMaterialUpdateResponseEntitySchema;
})(FieldOfCategoryMaterialUpdateCommand || (exports.FieldOfCategoryMaterialUpdateCommand = FieldOfCategoryMaterialUpdateCommand = {}));
