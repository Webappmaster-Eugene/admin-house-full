"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleDeleteCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const role_business_value_schema_1 = require("../../models/role/role-business-value.schema");
const common_1 = require("../../commands/common");
const RoleDeleteResponseEntitySchema = role_business_value_schema_1.RoleBusinessValueSchema;
const RoleDeleteResponseSchema = zod_1.z
    .object({
    data: RoleDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var RoleDeleteCommand;
(function (RoleDeleteCommand) {
    RoleDeleteCommand.RequestParamSchema = common_1.EntityUrlParamCommand.RequestUuidParamSchema;
    RoleDeleteCommand.ResponseSchema = RoleDeleteResponseSchema;
    RoleDeleteCommand.ResponseEntitySchema = RoleDeleteResponseEntitySchema;
})(RoleDeleteCommand || (exports.RoleDeleteCommand = RoleDeleteCommand = {}));
