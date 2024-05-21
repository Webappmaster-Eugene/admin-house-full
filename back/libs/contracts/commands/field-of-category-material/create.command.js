"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldOfCategoryMaterialCreateRequestSchema = models_1.FieldOfCategoryMaterialSchema.omit({
    uuid: true,
    createdByUuid: true,
    handbookUuid: true,
    createdAt: true,
    updatedAt: true,
});
const FieldOfCategoryMaterialCreateResponseSchema = zod_1.z
    .object({
    data: models_1.FieldOfCategoryMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var FieldOfCategoryMaterialCreateCommand;
(function (FieldOfCategoryMaterialCreateCommand) {
    FieldOfCategoryMaterialCreateCommand.RequestSchema = FieldOfCategoryMaterialCreateRequestSchema;
    FieldOfCategoryMaterialCreateCommand.ResponseSchema = FieldOfCategoryMaterialCreateResponseSchema;
})(FieldOfCategoryMaterialCreateCommand || (exports.FieldOfCategoryMaterialCreateCommand = FieldOfCategoryMaterialCreateCommand = {}));
