"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const RoleGetAllResponseSchema = zod_1.z
    .object({
    data: zod_1.z.array(models_1.RoleSchema.pick({
        uuid: true,
        idRole: true,
        name: true,
        description: true,
        lastChangeByUserUuid: true,
    })),
})
    .merge(models_2.ResponseClientSchema);
var RoleGetAllCommand;
(function (RoleGetAllCommand) {
    RoleGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    RoleGetAllCommand.ResponseSchema = RoleGetAllResponseSchema;
})(RoleGetAllCommand || (exports.RoleGetAllCommand = RoleGetAllCommand = {}));
