"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialBusinessValueSchema = void 0;
const characteristics_material_schema_1 = require("./characteristics-material.schema");
exports.CharacteristicsMaterialBusinessValueSchema = characteristics_material_schema_1.CharacteristicsMaterialSchema.pick({
    uuid: true,
    value: true,
    comment: true,
    numInOrder: true,
    characteristicsMaterialStatus: true,
    fieldOfCategoryMaterialUuid: true,
    handbookUuid: true,
    materialUuid: true,
    lastChangeByUserUuid: true,
});
