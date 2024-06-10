"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalCategoryMaterialGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const GlobalCategoryMaterialGetResponseEntitySchema = models_2.GlobalCategoryMaterialSchema.pick({
    name: true,
    nameRu: true,
    comment: true,
    color: true,
    uuid: true,
    lastChangeByUserUuid: true,
});
const GlobalCategoryMaterialGetResponseSchema = zod_1.z
    .object({
    data: GlobalCategoryMaterialGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var GlobalCategoryMaterialGetCommand;
(function (GlobalCategoryMaterialGetCommand) {
    GlobalCategoryMaterialGetCommand.ResponseSchema = GlobalCategoryMaterialGetResponseSchema;
    GlobalCategoryMaterialGetCommand.ResponseEntitySchema = GlobalCategoryMaterialGetResponseEntitySchema;
})(GlobalCategoryMaterialGetCommand || (exports.GlobalCategoryMaterialGetCommand = GlobalCategoryMaterialGetCommand = {}));
