"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const CharacteristicsMaterialGetAllResponseEntitySchema = zod_1.z.array(models_1.CharacteristicsMaterialSchema.pick({
    uuid: true,
    value: true,
    name: true,
    comment: true,
    fieldOfCategoryMaterialUuid: true,
    fieldUnitMeasurementUuid: true,
    fieldTypeUuid: true,
    handbookUuid: true,
    categoryMaterialUuid: true,
    materialUuid: true,
    lastChangeByUserUuid: true,
}));
const CharacteristicsMaterialGetAllResponseSchema = zod_1.z
    .object({
    data: CharacteristicsMaterialGetAllResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var CharacteristicsMaterialGetAllCommand;
(function (CharacteristicsMaterialGetAllCommand) {
    CharacteristicsMaterialGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    CharacteristicsMaterialGetAllCommand.ResponseSchema = CharacteristicsMaterialGetAllResponseSchema;
    CharacteristicsMaterialGetAllCommand.ResponseEntitySchema = CharacteristicsMaterialGetAllResponseEntitySchema;
})(CharacteristicsMaterialGetAllCommand || (exports.CharacteristicsMaterialGetAllCommand = CharacteristicsMaterialGetAllCommand = {}));
