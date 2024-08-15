"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const characteristics_material_business_value_schema_1 = require("../../models/characteristics-material/characteristics-material-business-value.schema");
const characteristics_material_related_entities_schema_1 = require("../../models/characteristics-material/characteristics-material-related-entities.schema");
const CharacteristicsMaterialCreateResponseEntitySchema = characteristics_material_business_value_schema_1.CharacteristicsMaterialBusinessValueSchema.merge(characteristics_material_related_entities_schema_1.CharacteristicsMaterialRelatedEntitiesSchema);
const CharacteristicsMaterialCreateRequestSchema = models_1.CharacteristicsMaterialSchema.pick({
    value: true,
    characteristicsMaterialStatus: true,
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
