"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResourceUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const status_resource_business_value_schema_1 = require("../../models/status-resource/status-resource-business-value.schema");
const StatusResourceUpdateResponseEntitySchema = status_resource_business_value_schema_1.StatusResourceBusinessValueSchema;
const StatusResourceUpdateRequestSchema = models_1.StatusResourceSchema.pick({
    name: true,
    comment: true,
}).partial();
const StatusResourceUpdateResponseSchema = zod_1.z
    .object({
    data: StatusResourceUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var StatusResourceUpdateCommand;
(function (StatusResourceUpdateCommand) {
    StatusResourceUpdateCommand.RequestSchema = StatusResourceUpdateRequestSchema;
    StatusResourceUpdateCommand.ResponseSchema = StatusResourceUpdateResponseSchema;
    StatusResourceUpdateCommand.ResponseEntitySchema = StatusResourceUpdateResponseEntitySchema;
})(StatusResourceUpdateCommand || (exports.StatusResourceUpdateCommand = StatusResourceUpdateCommand = {}));
