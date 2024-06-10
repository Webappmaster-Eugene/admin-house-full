"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResourceCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const StatusResourceCreateResponseEntitySchema = models_1.StatusResourceSchema.pick({
    name: true,
    comment: true,
    uuid: true,
    lastChangeByUserUuid: true,
    createdAt: true,
    updatedAt: true,
});
const StatusResourceCreateRequestSchema = models_1.StatusResourceSchema.pick({
    name: true,
    comment: true,
});
const StatusResourceCreateResponseSchema = zod_1.z
    .object({
    data: StatusResourceCreateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var StatusResourceCreateCommand;
(function (StatusResourceCreateCommand) {
    StatusResourceCreateCommand.RequestSchema = StatusResourceCreateRequestSchema;
    StatusResourceCreateCommand.ResponseSchema = StatusResourceCreateResponseSchema;
    StatusResourceCreateCommand.ResponseEntitySchema = StatusResourceCreateResponseEntitySchema;
})(StatusResourceCreateCommand || (exports.StatusResourceCreateCommand = StatusResourceCreateCommand = {}));
