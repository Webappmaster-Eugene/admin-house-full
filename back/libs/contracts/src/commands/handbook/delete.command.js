"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const handbook_business_value_schema_1 = require("../../models/handbook/handbook-business-value.schema");
const handbook_related_entities_schema_1 = require("../../models/handbook/handbook-related-entities.schema");
const HandbookDeleteResponseEntitySchema = handbook_business_value_schema_1.HandbookBusinessValueSchema.merge(handbook_related_entities_schema_1.HandbookRelatedEntitiesSchema);
const HandbookDeleteResponseSchema = zod_1.z
    .object({
    data: HandbookDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var HandbookDeleteCommand;
(function (HandbookDeleteCommand) {
    HandbookDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    HandbookDeleteCommand.ResponseSchema = HandbookDeleteResponseSchema;
    HandbookDeleteCommand.ResponseEntitySchema = HandbookDeleteResponseEntitySchema;
})(HandbookDeleteCommand || (exports.HandbookDeleteCommand = HandbookDeleteCommand = {}));
