"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldOfCategoryMaterialUpdateRequestSchema = models_1.FieldOfCategoryMaterialSchema.omit({
    createdAt: true,
    updatedAt: true,
    uuid: true,
    handbookUuid: true,
    createdByUuid: true,
    categoryMaterialUuid: true,
}).partial();
const FieldOfCategoryMaterialUpdateResponseSchema = zod_1.z
    .object({
    data: models_1.FieldOfCategoryMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var FieldOfCategoryMaterialUpdateCommand;
(function (FieldOfCategoryMaterialUpdateCommand) {
    FieldOfCategoryMaterialUpdateCommand.RequestSchema = FieldOfCategoryMaterialUpdateRequestSchema;
    FieldOfCategoryMaterialUpdateCommand.ResponseSchema = FieldOfCategoryMaterialUpdateResponseSchema;
})(FieldOfCategoryMaterialUpdateCommand || (exports.FieldOfCategoryMaterialUpdateCommand = FieldOfCategoryMaterialUpdateCommand = {}));
