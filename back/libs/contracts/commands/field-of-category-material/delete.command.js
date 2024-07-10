"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialDeleteCommand = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldOfCategoryMaterialDeleteResponseEntitySchema = models_1.FieldOfCategoryMaterialBusinessValueSchema.merge(models_1.FieldOfCategoryMaterialRelatedEntitiesSchema);
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
