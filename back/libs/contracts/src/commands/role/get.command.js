"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const role_business_value_schema_1 = require("../../models/role/role-business-value.schema");
const common_1 = require("../../commands/common");
const RoleGetResponseEntitySchema = role_business_value_schema_1.RoleBusinessValueSchema;
const RoleGetResponseSchema = zod_1.z
    .object({
    data: RoleGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var RoleGetCommand;
(function (RoleGetCommand) {
    RoleGetCommand.RequestParamSchema = common_1.EntityUrlParamCommand.RequestUuidParamSchema;
    RoleGetCommand.ResponseSchema = RoleGetResponseSchema;
    RoleGetCommand.ResponseEntitySchema = RoleGetResponseEntitySchema;
})(RoleGetCommand || (exports.RoleGetCommand = RoleGetCommand = {}));
