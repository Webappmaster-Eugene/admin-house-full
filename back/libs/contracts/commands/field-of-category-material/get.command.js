"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldOfCategoryMaterialGetResponseEntitySchema = models_1.FieldOfCategoryMaterialBusinessValueSchema.merge(models_1.FieldOfCategoryMaterialRelatedEntitiesSchema);
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
