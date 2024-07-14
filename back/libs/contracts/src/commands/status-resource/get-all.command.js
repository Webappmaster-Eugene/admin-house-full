"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResourceGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const status_resource_business_value_schema_1 = require("../../models/status-resource/status-resource-business-value.schema");
const StatusResourceGetAllResponseEntitySchema = zod_1.z.array(status_resource_business_value_schema_1.StatusResourceBusinessValueSchema);
const StatusResourceGetAllResponseSchema = zod_1.z
    .object({
    data: StatusResourceGetAllResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var StatusResourceGetAllCommand;
(function (StatusResourceGetAllCommand) {
    StatusResourceGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    StatusResourceGetAllCommand.ResponseSchema = StatusResourceGetAllResponseSchema;
    StatusResourceGetAllCommand.ResponseEntitySchema = StatusResourceGetAllResponseEntitySchema;
})(StatusResourceGetAllCommand || (exports.StatusResourceGetAllCommand = StatusResourceGetAllCommand = {}));
