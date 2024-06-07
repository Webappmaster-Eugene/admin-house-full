"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalCategoryMaterialUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const GlobalCategoryMaterialUpdateRequestSchema = models_2.GlobalCategoryMaterialSchema.pick({
    name: true,
    nameRu: true,
    comment: true,
    color: true,
}).partial();
const GlobalCategoryMaterialUpdateResponseSchema = zod_1.z
    .object({
    data: models_2.GlobalCategoryMaterialSchema.pick({
        name: true,
        nameRu: true,
        comment: true,
        color: true,
        uuid: true,
        lastChangeByUserUuid: true,
    }),
})
    .merge(models_1.ResponseClientSchema);
var GlobalCategoryMaterialUpdateCommand;
(function (GlobalCategoryMaterialUpdateCommand) {
    GlobalCategoryMaterialUpdateCommand.RequestSchema = GlobalCategoryMaterialUpdateRequestSchema;
    GlobalCategoryMaterialUpdateCommand.ResponseSchema = GlobalCategoryMaterialUpdateResponseSchema;
})(GlobalCategoryMaterialUpdateCommand || (exports.GlobalCategoryMaterialUpdateCommand = GlobalCategoryMaterialUpdateCommand = {}));
