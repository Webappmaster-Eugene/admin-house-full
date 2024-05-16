"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfMaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldOfMaterialCreateRequestSchema = models_1.FieldOfMaterialSchema.omit({
    uuid: true,
    createdByUuid: true,
    createdAt: true,
    updatedAt: true,
});
const FieldOfMaterialCreateResponseSchema = zod_1.z
    .object({
    data: models_1.FieldOfMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var FieldOfMaterialCreateCommand;
(function (FieldOfMaterialCreateCommand) {
    FieldOfMaterialCreateCommand.RequestSchema = FieldOfMaterialCreateRequestSchema;
    FieldOfMaterialCreateCommand.ResponseSchema = FieldOfMaterialCreateResponseSchema;
})(FieldOfMaterialCreateCommand || (exports.FieldOfMaterialCreateCommand = FieldOfMaterialCreateCommand = {}));
