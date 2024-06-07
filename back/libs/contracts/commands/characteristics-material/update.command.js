"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const CharacteristicsMaterialUpdateRequestSchema = models_1.CharacteristicsMaterialSchema.pick({
    name: true,
    value: true,
    comment: true,
}).partial();
const CharacteristicsMaterialUpdateResponseSchema = zod_1.z
    .object({
    data: models_1.CharacteristicsMaterialSchema.pick({
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
    }),
})
    .merge(models_1.ResponseClientSchema);
var CharacteristicsMaterialUpdateCommand;
(function (CharacteristicsMaterialUpdateCommand) {
    CharacteristicsMaterialUpdateCommand.RequestSchema = CharacteristicsMaterialUpdateRequestSchema;
    CharacteristicsMaterialUpdateCommand.ResponseSchema = CharacteristicsMaterialUpdateResponseSchema;
})(CharacteristicsMaterialUpdateCommand || (exports.CharacteristicsMaterialUpdateCommand = CharacteristicsMaterialUpdateCommand = {}));
