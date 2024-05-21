"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldOfCategoryMaterialGetResponseSchema = zod_1.z
    .object({
    data: models_1.FieldOfCategoryMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var FieldOfCategoryMaterialGetCommand;
(function (FieldOfCategoryMaterialGetCommand) {
    FieldOfCategoryMaterialGetCommand.ResponseSchema = FieldOfCategoryMaterialGetResponseSchema;
})(FieldOfCategoryMaterialGetCommand || (exports.FieldOfCategoryMaterialGetCommand = FieldOfCategoryMaterialGetCommand = {}));
