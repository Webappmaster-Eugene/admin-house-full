"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialDeleteCommand = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
const models_1 = require("../../models");
const CharacteristicsMaterialDeleteResponseSchema = zod_1.z
    .object({
    data: models_1.CharacteristicsMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_1.ResponseClientSchema);
var CharacteristicsMaterialDeleteCommand;
(function (CharacteristicsMaterialDeleteCommand) {
    CharacteristicsMaterialDeleteCommand.RequestParamSchema = common_1.EntityUrlParamCommand.RequestUuidParamSchema;
    CharacteristicsMaterialDeleteCommand.ResponseSchema = CharacteristicsMaterialDeleteResponseSchema;
})(CharacteristicsMaterialDeleteCommand || (exports.CharacteristicsMaterialDeleteCommand = CharacteristicsMaterialDeleteCommand = {}));
