"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalCategoryMaterialGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const GlobalCategoryMaterialGetAllResponseEntitySchema = zod_1.z.array(models_2.GlobalCategoryMaterialSchema.pick({
    name: true,
    nameRu: true,
    comment: true,
    color: true,
    uuid: true,
    lastChangeByUserUuid: true,
}));
const GlobalCategoryMaterialGetAllResponseSchema = zod_1.z
    .object({
    data: GlobalCategoryMaterialGetAllResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var GlobalCategoryMaterialGetAllCommand;
(function (GlobalCategoryMaterialGetAllCommand) {
    GlobalCategoryMaterialGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    GlobalCategoryMaterialGetAllCommand.ResponseSchema = GlobalCategoryMaterialGetAllResponseSchema;
    GlobalCategoryMaterialGetAllCommand.ResponseEntitySchema = GlobalCategoryMaterialGetAllResponseEntitySchema;
})(GlobalCategoryMaterialGetAllCommand || (exports.GlobalCategoryMaterialGetAllCommand = GlobalCategoryMaterialGetAllCommand = {}));
