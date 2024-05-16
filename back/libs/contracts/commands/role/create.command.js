"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const RoleCreateRequestSchema = models_1.RoleSchema.omit({
    idRole: true,
    uuid: true,
    createdAt: true,
    updatedAt: true,
}).merge(zod_1.z.object({
    key: zod_1.z.string(),
}));
const RoleCreateResponseSchema = zod_1.z
    .object({
    data: models_1.RoleSchema.pick({
        uuid: true,
        idRole: true,
        name: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var RoleCreateCommand;
(function (RoleCreateCommand) {
    RoleCreateCommand.RequestSchema = RoleCreateRequestSchema;
    RoleCreateCommand.ResponseSchema = RoleCreateResponseSchema;
})(RoleCreateCommand || (exports.RoleCreateCommand = RoleCreateCommand = {}));
