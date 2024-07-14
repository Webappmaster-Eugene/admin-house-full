"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResourceCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const status_resource_business_value_schema_1 = require("../../models/status-resource/status-resource-business-value.schema");
const StatusResourceCreateResponseEntitySchema = status_resource_business_value_schema_1.StatusResourceBusinessValueSchema;
const StatusResourceCreateRequestSchema = models_1.StatusResourceSchema.pick({
    name: true,
    comment: true,
});
const StatusResourceCreateResponseSchema = zod_1.z
    .object({
    data: StatusResourceCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var StatusResourceCreateCommand;
(function (StatusResourceCreateCommand) {
    StatusResourceCreateCommand.RequestSchema = StatusResourceCreateRequestSchema;
    StatusResourceCreateCommand.ResponseSchema = StatusResourceCreateResponseSchema;
    StatusResourceCreateCommand.ResponseEntitySchema = StatusResourceCreateResponseEntitySchema;
})(StatusResourceCreateCommand || (exports.StatusResourceCreateCommand = StatusResourceCreateCommand = {}));
