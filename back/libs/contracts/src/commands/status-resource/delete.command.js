"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResourceDeleteCommand = void 0;
const zod_1 = require("zod");
const common_1 = require("../../commands/common");
const models_1 = require("../../models");
const status_resource_business_value_schema_1 = require("../../models/status-resource/status-resource-business-value.schema");
const StatusResourceDeleteResponseEntitySchema = status_resource_business_value_schema_1.StatusResourceBusinessValueSchema;
const StatusResourceDeleteResponseSchema = zod_1.z
    .object({
    data: StatusResourceDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var StatusResourceDeleteCommand;
(function (StatusResourceDeleteCommand) {
    StatusResourceDeleteCommand.RequestParamSchema = common_1.EntityUrlParamCommand.RequestUuidParamSchema;
    StatusResourceDeleteCommand.ResponseSchema = StatusResourceDeleteResponseSchema;
    StatusResourceDeleteCommand.ResponseEntitySchema = StatusResourceDeleteResponseEntitySchema;
})(StatusResourceDeleteCommand || (exports.StatusResourceDeleteCommand = StatusResourceDeleteCommand = {}));
