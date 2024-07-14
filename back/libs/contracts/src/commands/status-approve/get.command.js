"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusApproveGetCommand = void 0;
const zod_1 = require("zod");
const status_approve_business_value_schema_1 = require("../../models/status-approve/status-approve-business-value.schema");
const models_1 = require("../../models");
const StatusApproveGetResponseEntitySchema = status_approve_business_value_schema_1.StatusApproveBusinessValueSchema;
const StatusApproveGetResponseSchema = zod_1.z
    .object({
    data: StatusApproveGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var StatusApproveGetCommand;
(function (StatusApproveGetCommand) {
    StatusApproveGetCommand.ResponseSchema = StatusApproveGetResponseSchema;
    StatusApproveGetCommand.ResponseEntitySchema = StatusApproveGetResponseEntitySchema;
})(StatusApproveGetCommand || (exports.StatusApproveGetCommand = StatusApproveGetCommand = {}));
