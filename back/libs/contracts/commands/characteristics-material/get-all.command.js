"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const CharacteristicsMaterialGetAllResponseSchema = zod_1.z
    .object({
    data: zod_1.z.array(models_1.CharacteristicsMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    })),
})
    .merge(models_1.ResponseClientSchema);
var CharacteristicsMaterialGetAllCommand;
(function (CharacteristicsMaterialGetAllCommand) {
    CharacteristicsMaterialGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    CharacteristicsMaterialGetAllCommand.ResponseSchema = CharacteristicsMaterialGetAllResponseSchema;
})(CharacteristicsMaterialGetAllCommand || (exports.CharacteristicsMaterialGetAllCommand = CharacteristicsMaterialGetAllCommand = {}));
