"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldOfMaterialGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldOfMaterialGetResponseSchema = zod_1.z
    .object({
    data: models_1.FieldOfMaterialSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var FieldOfMaterialGetCommand;
(function (FieldOfMaterialGetCommand) {
    FieldOfMaterialGetCommand.ResponseSchema = FieldOfMaterialGetResponseSchema;
})(FieldOfMaterialGetCommand || (exports.FieldOfMaterialGetCommand = FieldOfMaterialGetCommand = {}));
