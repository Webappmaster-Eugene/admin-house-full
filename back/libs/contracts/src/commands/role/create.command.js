"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleCreateCommand = void 0;
const zod_1 = require("zod");
const role_business_value_schema_1 = require("../../models/role/role-business-value.schema");
const models_1 = require("../../models");
const RoleCreateResponseEntitySchema = role_business_value_schema_1.RoleBusinessValueSchema;
const RoleCreateRequestSchema = models_1.RoleSchema.pick({
    name: true,
    description: true,
    idRole: true,
}).merge(zod_1.z.object({
    key: zod_1.z.string(),
}));
const RoleCreateResponseSchema = zod_1.z
    .object({
    data: RoleCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var RoleCreateCommand;
(function (RoleCreateCommand) {
    RoleCreateCommand.RequestSchema = RoleCreateRequestSchema;
    RoleCreateCommand.ResponseSchema = RoleCreateResponseSchema;
    RoleCreateCommand.ResponseEntitySchema = RoleCreateResponseEntitySchema;
})(RoleCreateCommand || (exports.RoleCreateCommand = RoleCreateCommand = {}));
