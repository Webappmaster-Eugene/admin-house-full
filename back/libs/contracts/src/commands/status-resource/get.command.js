"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResourceGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const status_resource_business_value_schema_1 = require("../../models/status-resource/status-resource-business-value.schema");
const StatusResourceGetResponseEntitySchema = status_resource_business_value_schema_1.StatusResourceBusinessValueSchema;
const StatusResourceGetResponseSchema = zod_1.z
    .object({
    data: StatusResourceGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var StatusResourceGetCommand;
(function (StatusResourceGetCommand) {
    StatusResourceGetCommand.BusinessValueSchema = status_resource_business_value_schema_1.StatusResourceBusinessValueSchema;
    StatusResourceGetCommand.ResponseSchema = StatusResourceGetResponseSchema;
    StatusResourceGetCommand.ResponseEntitySchema = StatusResourceGetResponseEntitySchema;
})(StatusResourceGetCommand || (exports.StatusResourceGetCommand = StatusResourceGetCommand = {}));
