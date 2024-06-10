"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResourceGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const StatusResourceGetAllResponseEntitySchema = zod_1.z.array(models_1.StatusResourceSchema.pick({
    name: true,
    comment: true,
    uuid: true,
    lastChangeByUserUuid: true,
    createdAt: true,
    updatedAt: true,
}));
const StatusResourceGetAllResponseSchema = zod_1.z
    .object({
    data: StatusResourceGetAllResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var StatusResourceGetAllCommand;
(function (StatusResourceGetAllCommand) {
    StatusResourceGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    StatusResourceGetAllCommand.ResponseSchema = StatusResourceGetAllResponseSchema;
    StatusResourceGetAllCommand.ResponseEntitySchema = StatusResourceGetAllResponseEntitySchema;
})(StatusResourceGetAllCommand || (exports.StatusResourceGetAllCommand = StatusResourceGetAllCommand = {}));
