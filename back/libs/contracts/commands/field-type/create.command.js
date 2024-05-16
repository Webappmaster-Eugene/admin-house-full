"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTypeCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldTypeCreateRequestSchema = models_1.FieldTypeSchema.omit({
    uuid: true,
    createdAt: true,
    updatedAt: true,
});
const FieldTypeCreateResponseSchema = zod_1.z
    .object({
    data: models_1.FieldTypeSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var FieldTypeCreateCommand;
(function (FieldTypeCreateCommand) {
    FieldTypeCreateCommand.RequestSchema = FieldTypeCreateRequestSchema;
    FieldTypeCreateCommand.ResponseSchema = FieldTypeCreateResponseSchema;
})(FieldTypeCreateCommand || (exports.FieldTypeCreateCommand = FieldTypeCreateCommand = {}));
