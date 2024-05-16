"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResourceGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const StatusResourceGetResponseSchema = zod_1.z
    .object({
    data: models_1.StatusResourceSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var StatusResourceGetCommand;
(function (StatusResourceGetCommand) {
    StatusResourceGetCommand.ResponseSchema = StatusResourceGetResponseSchema;
})(StatusResourceGetCommand || (exports.StatusResourceGetCommand = StatusResourceGetCommand = {}));
