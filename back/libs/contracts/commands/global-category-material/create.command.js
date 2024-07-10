"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalCategoryMaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const GlobalCategoryMaterialCreateResponseEntitySchema = models_1.GlobalCategoryMaterialBusinessValueSchema;
const GlobalCategoryMaterialCreateRequestSchema = models_2.GlobalCategoryMaterialSchema.pick({
    name: true,
    nameRu: true,
    comment: true,
    color: true,
});
const GlobalCategoryMaterialCreateResponseSchema = zod_1.z
    .object({
    data: GlobalCategoryMaterialCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var GlobalCategoryMaterialCreateCommand;
(function (GlobalCategoryMaterialCreateCommand) {
    GlobalCategoryMaterialCreateCommand.RequestSchema = GlobalCategoryMaterialCreateRequestSchema;
    GlobalCategoryMaterialCreateCommand.ResponseSchema = GlobalCategoryMaterialCreateResponseSchema;
    GlobalCategoryMaterialCreateCommand.ResponseEntitySchema = GlobalCategoryMaterialCreateResponseEntitySchema;
})(GlobalCategoryMaterialCreateCommand || (exports.GlobalCategoryMaterialCreateCommand = GlobalCategoryMaterialCreateCommand = {}));
