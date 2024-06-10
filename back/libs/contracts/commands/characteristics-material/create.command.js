"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const CharacteristicsMaterialCreateResponseEntitySchema = models_1.CharacteristicsMaterialSchema.pick({
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
const CharacteristicsMaterialCreateRequestSchema = models_1.CharacteristicsMaterialSchema.pick({
    name: true,
    value: true,
    comment: true,
});
const CharacteristicsMaterialCreateResponseSchema = zod_1.z
    .object({
    data: CharacteristicsMaterialCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var CharacteristicsMaterialCreateCommand;
(function (CharacteristicsMaterialCreateCommand) {
    CharacteristicsMaterialCreateCommand.RequestSchema = CharacteristicsMaterialCreateRequestSchema;
    CharacteristicsMaterialCreateCommand.ResponseSchema = CharacteristicsMaterialCreateResponseSchema;
    CharacteristicsMaterialCreateCommand.ResponseEntitySchema = CharacteristicsMaterialCreateResponseEntitySchema;
})(CharacteristicsMaterialCreateCommand || (exports.CharacteristicsMaterialCreateCommand = CharacteristicsMaterialCreateCommand = {}));
