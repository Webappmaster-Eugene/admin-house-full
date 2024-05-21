"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialDeleteCommand = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldOfCategoryMaterialDeleteResponseSchema = zod_1.z
    .object({
    data: models_1.FieldOfCategoryMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var FieldOfCategoryMaterialDeleteCommand;
(function (FieldOfCategoryMaterialDeleteCommand) {
    FieldOfCategoryMaterialDeleteCommand.RequestParamSchema = common_1.EntityUrlParamCommand.RequestUuidParamSchema;
    FieldOfCategoryMaterialDeleteCommand.ResponseSchema = FieldOfCategoryMaterialDeleteResponseSchema;
})(FieldOfCategoryMaterialDeleteCommand || (exports.FieldOfCategoryMaterialDeleteCommand = FieldOfCategoryMaterialDeleteCommand = {}));
