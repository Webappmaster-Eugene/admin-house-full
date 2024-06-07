"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResourceUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const StatusResourceUpdateRequestSchema = models_1.StatusResourceSchema.pick({
    name: true,
    comment: true,
}).partial();
const StatusResourceUpdateResponseSchema = zod_1.z
    .object({
    data: models_1.StatusResourceSchema.pick({
        name: true,
        comment: true,
        uuid: true,
        lastChangeByUserUuid: true,
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var StatusResourceUpdateCommand;
(function (StatusResourceUpdateCommand) {
    StatusResourceUpdateCommand.RequestSchema = StatusResourceUpdateRequestSchema;
    StatusResourceUpdateCommand.ResponseSchema = StatusResourceUpdateResponseSchema;
})(StatusResourceUpdateCommand || (exports.StatusResourceUpdateCommand = StatusResourceUpdateCommand = {}));
