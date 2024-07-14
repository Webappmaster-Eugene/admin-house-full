"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechLogChangesCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const tech_log_changes_business_value_schema_1 = require("../../models/tech-log-changes/tech-log-changes-business-value.schema");
const TechLogChangesCreateResponseEntitySchema = tech_log_changes_business_value_schema_1.TechLogChangesBusinessValueSchema;
const TechLogChangesCreateRequestSchema = models_1.TechLogChangesSchema.pick({
    updateInfo: true,
    action: true,
    oldInfo: true,
    newInfo: true,
    name: true,
    comment: true,
});
const TechLogChangesCreateResponseSchema = zod_1.z
    .object({
    data: TechLogChangesCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var TechLogChangesCreateCommand;
(function (TechLogChangesCreateCommand) {
    TechLogChangesCreateCommand.RequestSchema = TechLogChangesCreateRequestSchema;
    TechLogChangesCreateCommand.ResponseSchema = TechLogChangesCreateResponseSchema;
    TechLogChangesCreateCommand.ResponseEntitySchema = TechLogChangesCreateResponseEntitySchema;
})(TechLogChangesCreateCommand || (exports.TechLogChangesCreateCommand = TechLogChangesCreateCommand = {}));
