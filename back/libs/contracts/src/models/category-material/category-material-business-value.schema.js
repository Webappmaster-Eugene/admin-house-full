"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialBusinessValueSchema = void 0;
const category_material_1 = require("../category-material");
exports.CategoryMaterialBusinessValueSchema = category_material_1.CategoryMaterialSchema.pick({
    name: true,
    templateName: true,
    isDefault: true,
    comment: true,
    uuid: true,
    globalCategoryMaterialUuid: true,
    numInOrder: true,
    categoryMaterialStatus: true,
    lastChangeByUserUuid: true,
});
