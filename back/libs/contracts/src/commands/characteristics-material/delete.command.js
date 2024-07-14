"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicsMaterialDeleteCommand = void 0;
const zod_1 = require("zod");
const common_1 = require("../common");
const models_1 = require("../../models");
const characteristics_material_related_entities_schema_1 = require("../../models/characteristics-material/characteristics-material-related-entities.schema");
const characteristics_material_business_value_schema_1 = require("../../models/characteristics-material/characteristics-material-business-value.schema");
const CharacteristicsMaterialDeleteResponseEntitySchema = characteristics_material_business_value_schema_1.CharacteristicsMaterialBusinessValueSchema.merge(characteristics_material_related_entities_schema_1.CharacteristicsMaterialRelatedEntitiesSchema);
const CharacteristicsMaterialDeleteResponseSchema = zod_1.z
    .object({
    data: CharacteristicsMaterialDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var CharacteristicsMaterialDeleteCommand;
(function (CharacteristicsMaterialDeleteCommand) {
    CharacteristicsMaterialDeleteCommand.RequestParamSchema = common_1.EntityUrlParamCommand.RequestUuidParamSchema;
    CharacteristicsMaterialDeleteCommand.ResponseSchema = CharacteristicsMaterialDeleteResponseSchema;
    CharacteristicsMaterialDeleteCommand.ResponseEntitySchema = CharacteristicsMaterialDeleteResponseEntitySchema;
})(CharacteristicsMaterialDeleteCommand || (exports.CharacteristicsMaterialDeleteCommand = CharacteristicsMaterialDeleteCommand = {}));
