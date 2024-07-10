"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalCategoryMaterialBusinessValueSchema = void 0;
const global_category_material_schema_1 = require("./global-category-material.schema");
exports.GlobalCategoryMaterialBusinessValueSchema = global_category_material_schema_1.GlobalCategoryMaterialSchema.pick({
    name: true,
    nameRu: true,
    comment: true,
    color: true,
    uuid: true,
    lastChangeByUserUuid: true,
});
