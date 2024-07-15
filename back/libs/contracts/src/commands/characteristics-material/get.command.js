"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const characteristics_material_business_value_schema_1 = require("../../models/characteristics-material/characteristics-material-business-value.schema");
const characteristics_material_related_entities_schema_1 = require("../../models/characteristics-material/characteristics-material-related-entities.schema");
const CharacteristicsMaterialGetResponseEntitySchema = characteristics_material_business_value_schema_1.CharacteristicsMaterialBusinessValueSchema.merge(characteristics_material_related_entities_schema_1.CharacteristicsMaterialRelatedEntitiesSchema);
const CharacteristicsMaterialGetResponseSchema = zod_1.z
    .object({
    data: CharacteristicsMaterialGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var CharacteristicsMaterialGetCommand;
(function (CharacteristicsMaterialGetCommand) {
    CharacteristicsMaterialGetCommand.BusinessValueSchema = characteristics_material_business_value_schema_1.CharacteristicsMaterialBusinessValueSchema;
    CharacteristicsMaterialGetCommand.ResponseSchema = CharacteristicsMaterialGetResponseSchema;
    CharacteristicsMaterialGetCommand.ResponseEntitySchema = CharacteristicsMaterialGetResponseEntitySchema;
})(CharacteristicsMaterialGetCommand || (exports.CharacteristicsMaterialGetCommand = CharacteristicsMaterialGetCommand = {}));
