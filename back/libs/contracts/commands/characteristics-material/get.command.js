"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const CharacteristicsMaterialGetResponseEntitySchema = models_1.CharacteristicsMaterialSchema.pick({
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
});
const CharacteristicsMaterialGetResponseSchema = zod_1.z
    .object({
    data: CharacteristicsMaterialGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var CharacteristicsMaterialGetCommand;
(function (CharacteristicsMaterialGetCommand) {
    CharacteristicsMaterialGetCommand.ResponseSchema = CharacteristicsMaterialGetResponseSchema;
    CharacteristicsMaterialGetCommand.ResponseEntitySchema = CharacteristicsMaterialGetResponseEntitySchema;
})(CharacteristicsMaterialGetCommand || (exports.CharacteristicsMaterialGetCommand = CharacteristicsMaterialGetCommand = {}));
