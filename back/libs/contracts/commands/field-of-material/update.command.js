"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfMaterialUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldOfMaterialUpdateRequestSchema = models_1.FieldOfMaterialSchema.omit({
    createdAt: true,
    updatedAt: true,
    uuid: true,
}).partial();
const FieldOfMaterialUpdateResponseSchema = zod_1.z
    .object({
    data: models_1.FieldOfMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var FieldOfMaterialUpdateCommand;
(function (FieldOfMaterialUpdateCommand) {
    FieldOfMaterialUpdateCommand.RequestSchema = FieldOfMaterialUpdateRequestSchema;
    FieldOfMaterialUpdateCommand.ResponseSchema = FieldOfMaterialUpdateResponseSchema;
})(FieldOfMaterialUpdateCommand || (exports.FieldOfMaterialUpdateCommand = FieldOfMaterialUpdateCommand = {}));
