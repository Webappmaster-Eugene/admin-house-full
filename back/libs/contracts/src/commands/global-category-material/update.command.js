"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalCategoryMaterialUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const global_category_business_value_schema_1 = require("../../models/global-category-material/global-category-business-value.schema");
const GlobalCategoryMaterialUpdateResponseEntitySchema = global_category_business_value_schema_1.GlobalCategoryMaterialBusinessValueSchema;
const GlobalCategoryMaterialUpdateRequestSchema = models_1.GlobalCategoryMaterialSchema.pick({
    name: true,
    nameRu: true,
    comment: true,
    color: true,
}).partial();
const GlobalCategoryMaterialUpdateResponseSchema = zod_1.z
    .object({
    data: GlobalCategoryMaterialUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var GlobalCategoryMaterialUpdateCommand;
(function (GlobalCategoryMaterialUpdateCommand) {
    GlobalCategoryMaterialUpdateCommand.RequestSchema = GlobalCategoryMaterialUpdateRequestSchema;
    GlobalCategoryMaterialUpdateCommand.ResponseSchema = GlobalCategoryMaterialUpdateResponseSchema;
    GlobalCategoryMaterialUpdateCommand.ResponseEntitySchema = GlobalCategoryMaterialUpdateResponseEntitySchema;
})(GlobalCategoryMaterialUpdateCommand || (exports.GlobalCategoryMaterialUpdateCommand = GlobalCategoryMaterialUpdateCommand = {}));
