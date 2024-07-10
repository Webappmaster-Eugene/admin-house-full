"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const field_of_category_material_1 = require("../field-of-category-material");
const handbook_1 = require("../handbook");
exports.FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema = zod_1.z.object({
    handbook: handbook_1.HandbookBusinessValueSchema,
    fieldOfCategoryMaterial: field_of_category_material_1.FieldOfCategoryMaterialBusinessValueSchema,
});
