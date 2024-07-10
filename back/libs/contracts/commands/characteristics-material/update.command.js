"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const CharacteristicsMaterialUpdateResponseEntitySchema = models_1.CharacteristicsMaterialBusinessValueSchema.merge(models_1.CharacteristicsMaterialRelatedEntitiesSchema);
const CharacteristicsMaterialUpdateRequestSchema = models_1.CharacteristicsMaterialSchema.pick({
    name: true,
    value: true,
    comment: true,
}).partial();
const CharacteristicsMaterialUpdateResponseSchema = zod_1.z
    .object({
    data: CharacteristicsMaterialUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var CharacteristicsMaterialUpdateCommand;
(function (CharacteristicsMaterialUpdateCommand) {
    CharacteristicsMaterialUpdateCommand.RequestSchema = CharacteristicsMaterialUpdateRequestSchema;
    CharacteristicsMaterialUpdateCommand.ResponseSchema = CharacteristicsMaterialUpdateResponseSchema;
    CharacteristicsMaterialUpdateCommand.ResponseEntitySchema = CharacteristicsMaterialUpdateResponseEntitySchema;
})(CharacteristicsMaterialUpdateCommand || (exports.CharacteristicsMaterialUpdateCommand = CharacteristicsMaterialUpdateCommand = {}));
