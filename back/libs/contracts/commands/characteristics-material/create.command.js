"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const CharacteristicsMaterialCreateRequestSchema = models_1.CharacteristicsMaterialSchema.omit({
    uuid: true,
    addedByUserUuid: true,
    categoryMaterialUuid: true,
    materialUuid: true,
    handbookUuid: true,
    createdAt: true,
    updatedAt: true,
});
const CharacteristicsMaterialCreateResponseSchema = zod_1.z
    .object({
    data: models_1.CharacteristicsMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_1.ResponseClientSchema);
var CharacteristicsMaterialCreateCommand;
(function (CharacteristicsMaterialCreateCommand) {
    CharacteristicsMaterialCreateCommand.RequestSchema = CharacteristicsMaterialCreateRequestSchema;
    CharacteristicsMaterialCreateCommand.ResponseSchema = CharacteristicsMaterialCreateResponseSchema;
})(CharacteristicsMaterialCreateCommand || (exports.CharacteristicsMaterialCreateCommand = CharacteristicsMaterialCreateCommand = {}));
