"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const CharacteristicsMaterialUpdateRequestSchema = models_1.CharacteristicsMaterialSchema.omit({
    createdAt: true,
    updatedAt: true,
    uuid: true,
    handbookUuid: true,
    addedByUserUuid: true,
}).partial();
const CharacteristicsMaterialUpdateResponseSchema = zod_1.z
    .object({
    data: models_1.CharacteristicsMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_1.ResponseClientSchema);
var CharacteristicsMaterialUpdateCommand;
(function (CharacteristicsMaterialUpdateCommand) {
    CharacteristicsMaterialUpdateCommand.RequestSchema = CharacteristicsMaterialUpdateRequestSchema;
    CharacteristicsMaterialUpdateCommand.ResponseSchema = CharacteristicsMaterialUpdateResponseSchema;
})(CharacteristicsMaterialUpdateCommand || (exports.CharacteristicsMaterialUpdateCommand = CharacteristicsMaterialUpdateCommand = {}));
