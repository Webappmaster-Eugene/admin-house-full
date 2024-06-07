"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResourceGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const StatusResourceGetAllResponseSchema = zod_1.z
    .object({
    data: zod_1.z.array(models_1.StatusResourceSchema.pick({
        createdAt: true,
        updatedAt: true,
    })),
})
    .merge(models_2.ResponseClientSchema);
var StatusResourceGetAllCommand;
(function (StatusResourceGetAllCommand) {
    StatusResourceGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    StatusResourceGetAllCommand.ResponseSchema = StatusResourceGetAllResponseSchema;
})(StatusResourceGetAllCommand || (exports.StatusResourceGetAllCommand = StatusResourceGetAllCommand = {}));
