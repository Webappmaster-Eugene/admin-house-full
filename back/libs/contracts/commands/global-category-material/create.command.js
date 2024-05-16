"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalCategoryMaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const GlobalCategoryMaterialCreateRequestSchema = models_2.GlobalCategoryMaterialSchema.omit({
    uuid: true,
    createdAt: true,
    updatedAt: true,
});
const GlobalCategoryMaterialCreateResponseSchema = zod_1.z
    .object({
    data: models_2.GlobalCategoryMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_1.ResponseClientSchema);
var GlobalCategoryMaterialCreateCommand;
(function (GlobalCategoryMaterialCreateCommand) {
    GlobalCategoryMaterialCreateCommand.RequestSchema = GlobalCategoryMaterialCreateRequestSchema;
    GlobalCategoryMaterialCreateCommand.ResponseSchema = GlobalCategoryMaterialCreateResponseSchema;
})(GlobalCategoryMaterialCreateCommand || (exports.GlobalCategoryMaterialCreateCommand = GlobalCategoryMaterialCreateCommand = {}));
