"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTypeUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldTypeUpdateRequestSchema = models_1.FieldTypeSchema.omit({
    createdAt: true,
    updatedAt: true,
    uuid: true,
}).partial();
const FieldTypeUpdateResponseSchema = zod_1.z
    .object({
    data: models_1.FieldTypeSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var FieldTypeUpdateCommand;
(function (FieldTypeUpdateCommand) {
    FieldTypeUpdateCommand.RequestSchema = FieldTypeUpdateRequestSchema;
    FieldTypeUpdateCommand.ResponseSchema = FieldTypeUpdateResponseSchema;
})(FieldTypeUpdateCommand || (exports.FieldTypeUpdateCommand = FieldTypeUpdateCommand = {}));
