"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMaterialRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const global_category_material_1 = require("../global-category-material");
const material_1 = require("../material");
const field_of_category_material_1 = require("../field-of-category-material");
const handbook_1 = require("../handbook");
exports.CategoryMaterialRelatedEntitiesSchema = zod_1.z.object({
    materials: zod_1.z.array(material_1.MaterialBusinessValueSchema).nullable().optional(),
    fieldsOfCategoryMaterials: zod_1.z.array(field_of_category_material_1.FieldOfCategoryMaterialBusinessValueSchema).nullable().optional(),
    globalCategoryMaterial: global_category_material_1.GlobalCategoryMaterialBusinessValueSchema,
    handbook: handbook_1.HandbookBusinessValueSchema,
});
