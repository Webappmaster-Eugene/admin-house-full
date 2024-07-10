"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialBusinessValueSchema = void 0;
const material_schema_1 = require("./material.schema");
exports.MaterialBusinessValueSchema = material_schema_1.MaterialSchema.pick({
    name: true,
    price: true,
    comment: true,
    namePublic: true,
    sourceInfo: true,
    unitMeasurementUuid: true,
    responsiblePartnerUuid: true,
    categoryMaterialUuid: true,
    handbookUuid: true,
    lastChangeByUserUuid: true,
    uuid: true,
});
