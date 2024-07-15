"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechLogChangesGetCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const tech_log_changes_business_value_schema_1 = require("../../models/tech-log-changes/tech-log-changes-business-value.schema");
const TechLogChangesGetResponseEntitySchema = tech_log_changes_business_value_schema_1.TechLogChangesBusinessValueSchema;
const TechLogChangesGetResponseSchema = zod_1.z
    .object({
    data: TechLogChangesGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var TechLogChangesGetCommand;
(function (TechLogChangesGetCommand) {
    TechLogChangesGetCommand.BusinessValueSchema = tech_log_changes_business_value_schema_1.TechLogChangesBusinessValueSchema;
    TechLogChangesGetCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    TechLogChangesGetCommand.ResponseSchema = TechLogChangesGetResponseSchema;
    TechLogChangesGetCommand.ResponseEntitySchema = TechLogChangesGetResponseEntitySchema;
})(TechLogChangesGetCommand || (exports.TechLogChangesGetCommand = TechLogChangesGetCommand = {}));
