"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const MaterialGetAllResponseSchema = zod_1.z
    .object({
    data: zod_1.z.array(models_1.MaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    })),
})
    .merge(models_2.ResponseClientSchema);
var MaterialGetAllCommand;
(function (MaterialGetAllCommand) {
    MaterialGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    MaterialGetAllCommand.ResponseSchema = MaterialGetAllResponseSchema;
})(MaterialGetAllCommand || (exports.MaterialGetAllCommand = MaterialGetAllCommand = {}));
