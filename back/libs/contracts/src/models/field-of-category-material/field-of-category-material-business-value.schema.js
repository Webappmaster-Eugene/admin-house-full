"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfCategoryMaterialBusinessValueSchema = void 0;
const field_of_category_material_1 = require("../field-of-category-material");
exports.FieldOfCategoryMaterialBusinessValueSchema = field_of_category_material_1.FieldOfCategoryMaterialSchema.pick({
    name: true,
    comment: true,
    uniqueNameForTemplate: true,
    fieldOfCategoryMaterialStatus: true,
    numInOrder: true,
    defaultValue: true,
    isRequired: true,
    unitOfMeasurementUuid: true,
    fieldTypeUuid: true,
    lastChangeByUserUuid: true,
    handbookUuid: true,
    uuid: true,
    updatedAt: true,
});
