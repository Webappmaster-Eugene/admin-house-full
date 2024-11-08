"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const role_business_value_schema_1 = require("../../models/role/role-business-value.schema");
const RoleGetAllResponseEntitySchema = zod_1.z.array(role_business_value_schema_1.RoleBusinessValueSchema);
const RoleGetAllResponseSchema = zod_1.z
    .object({
    data: RoleGetAllResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var RoleGetAllCommand;
(function (RoleGetAllCommand) {
    RoleGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    RoleGetAllCommand.ResponseSchema = RoleGetAllResponseSchema;
    RoleGetAllCommand.ResponseEntitySchema = RoleGetAllResponseEntitySchema;
})(RoleGetAllCommand || (exports.RoleGetAllCommand = RoleGetAllCommand = {}));
