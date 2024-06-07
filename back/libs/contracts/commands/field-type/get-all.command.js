"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTypeGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldTypeGetAllResponseSchema = zod_1.z
    .object({
    data: zod_1.z.array(models_1.FieldTypeSchema.pick({
        name: true,
        description: true,
        jsType: true,
        lastChangeByUserUuid: true,
        uuid: true,
    })),
})
    .merge(models_2.ResponseClientSchema);
var FieldTypeGetAllCommand;
(function (FieldTypeGetAllCommand) {
    FieldTypeGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    FieldTypeGetAllCommand.ResponseSchema = FieldTypeGetAllResponseSchema;
})(FieldTypeGetAllCommand || (exports.FieldTypeGetAllCommand = FieldTypeGetAllCommand = {}));
