"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResourceGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const StatusResourceGetResponseEntitySchema = models_1.StatusResourceBusinessValueSchema;
const StatusResourceGetResponseSchema = zod_1.z
    .object({
    data: StatusResourceGetResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var StatusResourceGetCommand;
(function (StatusResourceGetCommand) {
    StatusResourceGetCommand.ResponseSchema = StatusResourceGetResponseSchema;
    StatusResourceGetCommand.ResponseEntitySchema = StatusResourceGetResponseEntitySchema;
})(StatusResourceGetCommand || (exports.StatusResourceGetCommand = StatusResourceGetCommand = {}));
