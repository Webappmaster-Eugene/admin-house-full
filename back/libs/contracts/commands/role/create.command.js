"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const RoleCreateResponseEntitySchema = models_1.RoleBusinessValueSchema;
const RoleCreateRequestSchema = models_1.RoleSchema.pick({
    name: true,
    description: true,
}).merge(zod_1.z.object({
    key: zod_1.z.string(),
}));
const RoleCreateResponseSchema = zod_1.z
    .object({
    data: RoleCreateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var RoleCreateCommand;
(function (RoleCreateCommand) {
    RoleCreateCommand.RequestSchema = RoleCreateRequestSchema;
    RoleCreateCommand.ResponseSchema = RoleCreateResponseSchema;
    RoleCreateCommand.ResponseEntitySchema = RoleCreateResponseEntitySchema;
})(RoleCreateCommand || (exports.RoleCreateCommand = RoleCreateCommand = {}));
