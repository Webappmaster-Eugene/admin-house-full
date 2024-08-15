"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const characteristics_material_related_entities_schema_1 = require("../../models/characteristics-material/characteristics-material-related-entities.schema");
const characteristics_material_business_value_schema_1 = require("../../models/characteristics-material/characteristics-material-business-value.schema");
const CharacteristicsMaterialUpdateResponseEntitySchema = characteristics_material_business_value_schema_1.CharacteristicsMaterialBusinessValueSchema.merge(characteristics_material_related_entities_schema_1.CharacteristicsMaterialRelatedEntitiesSchema);
const CharacteristicsMaterialUpdateRequestSchema = models_1.CharacteristicsMaterialSchema.pick({
    value: true,
    comment: true,
    characteristicsMaterialStatus: true,
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
