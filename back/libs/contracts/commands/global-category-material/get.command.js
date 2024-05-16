"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalCategoryMaterialGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const GlobalCategoryMaterialGetResponseSchema = zod_1.z
    .object({
    data: models_2.GlobalCategoryMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_1.ResponseClientSchema);
var GlobalCategoryMaterialGetCommand;
(function (GlobalCategoryMaterialGetCommand) {
    GlobalCategoryMaterialGetCommand.ResponseSchema = GlobalCategoryMaterialGetResponseSchema;
})(GlobalCategoryMaterialGetCommand || (exports.GlobalCategoryMaterialGetCommand = GlobalCategoryMaterialGetCommand = {}));
