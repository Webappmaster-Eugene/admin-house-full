"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResourceCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const StatusResourceCreateRequestSchema = models_1.StatusResourceSchema.omit({
    uuid: true,
    createdAt: true,
    updatedAt: true,
});
const StatusResourceCreateResponseSchema = zod_1.z
    .object({
    data: models_1.StatusResourceSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var StatusResourceCreateCommand;
(function (StatusResourceCreateCommand) {
    StatusResourceCreateCommand.RequestSchema = StatusResourceCreateRequestSchema;
    StatusResourceCreateCommand.ResponseSchema = StatusResourceCreateResponseSchema;
})(StatusResourceCreateCommand || (exports.StatusResourceCreateCommand = StatusResourceCreateCommand = {}));
