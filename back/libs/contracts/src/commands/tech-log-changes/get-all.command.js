"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechLogChangesGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const tech_log_changes_business_value_schema_1 = require("../../models/tech-log-changes/tech-log-changes-business-value.schema");
const TechLogChangesGetAllResponseEntitySchema = zod_1.z.array(tech_log_changes_business_value_schema_1.TechLogChangesBusinessValueSchema);
const TechLogChangesGetAllResponseSchema = zod_1.z
    .object({
    data: TechLogChangesGetAllResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var TechLogChangesGetAllCommand;
(function (TechLogChangesGetAllCommand) {
    TechLogChangesGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    TechLogChangesGetAllCommand.ResponseSchema = TechLogChangesGetAllResponseSchema;
    TechLogChangesGetAllCommand.ResponseEntitySchema = TechLogChangesGetAllResponseEntitySchema;
})(TechLogChangesGetAllCommand || (exports.TechLogChangesGetAllCommand = TechLogChangesGetAllCommand = {}));
