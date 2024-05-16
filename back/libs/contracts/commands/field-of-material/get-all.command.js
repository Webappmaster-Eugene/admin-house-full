"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfMaterialGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldOfMaterialGetAllResponseSchema = zod_1.z
    .object({
    data: zod_1.z.array(models_1.FieldOfMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    })),
})
    .merge(models_2.ResponseClientSchema);
var FieldOfMaterialGetAllCommand;
(function (FieldOfMaterialGetAllCommand) {
    FieldOfMaterialGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    FieldOfMaterialGetAllCommand.ResponseSchema = FieldOfMaterialGetAllResponseSchema;
})(FieldOfMaterialGetAllCommand || (exports.FieldOfMaterialGetAllCommand = FieldOfMaterialGetAllCommand = {}));
