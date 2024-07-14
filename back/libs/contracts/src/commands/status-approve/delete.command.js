"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusApproveDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const status_approve_business_value_schema_1 = require("../../models/status-approve/status-approve-business-value.schema");
const StatusApproveDeleteResponseEntitySchema = status_approve_business_value_schema_1.StatusApproveBusinessValueSchema;
const StatusApproveDeleteResponseSchema = zod_1.z
    .object({
    data: StatusApproveDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var StatusApproveDeleteCommand;
(function (StatusApproveDeleteCommand) {
    StatusApproveDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    StatusApproveDeleteCommand.ResponseSchema = StatusApproveDeleteResponseSchema;
    StatusApproveDeleteCommand.ResponseEntitySchema = StatusApproveDeleteResponseEntitySchema;
})(StatusApproveDeleteCommand || (exports.StatusApproveDeleteCommand = StatusApproveDeleteCommand = {}));
