"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const role_business_value_schema_1 = require("../../models/role/role-business-value.schema");
const common_1 = require("../../commands/common");
const RoleUpdateResponseEntitySchema = role_business_value_schema_1.RoleBusinessValueSchema;
const RoleUpdateRequestSchema = models_1.RoleSchema.pick({ description: true }).partial();
const RoleUpdateResponseSchema = zod_1.z
    .object({
    data: RoleUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var RoleUpdateCommand;
(function (RoleUpdateCommand) {
    RoleUpdateCommand.RequestParamSchema = common_1.EntityUrlParamCommand.RequestUuidParamSchema;
    RoleUpdateCommand.RequestSchema = RoleUpdateRequestSchema;
    RoleUpdateCommand.ResponseSchema = RoleUpdateResponseSchema;
    RoleUpdateCommand.ResponseEntitySchema = RoleUpdateResponseEntitySchema;
})(RoleUpdateCommand || (exports.RoleUpdateCommand = RoleUpdateCommand = {}));
