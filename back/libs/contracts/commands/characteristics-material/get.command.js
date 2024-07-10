"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const CharacteristicsMaterialGetResponseEntitySchema = models_1.CharacteristicsMaterialBusinessValueSchema.merge(models_1.CharacteristicsMaterialRelatedEntitiesSchema);
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
