"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const CharacteristicsMaterialGetResponseSchema = zod_1.z
    .object({
    data: models_1.CharacteristicsMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_1.ResponseClientSchema);
var CharacteristicsMaterialGetCommand;
(function (CharacteristicsMaterialGetCommand) {
    CharacteristicsMaterialGetCommand.ResponseSchema = CharacteristicsMaterialGetResponseSchema;
})(CharacteristicsMaterialGetCommand || (exports.CharacteristicsMaterialGetCommand = CharacteristicsMaterialGetCommand = {}));
