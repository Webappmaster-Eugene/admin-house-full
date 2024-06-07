"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTypeGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldTypeGetResponseSchema = zod_1.z
    .object({
    data: models_1.FieldTypeSchema.pick({
        name: true,
        description: true,
        jsType: true,
        lastChangeByUserUuid: true,
        uuid: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var FieldTypeGetCommand;
(function (FieldTypeGetCommand) {
    FieldTypeGetCommand.ResponseSchema = FieldTypeGetResponseSchema;
})(FieldTypeGetCommand || (exports.FieldTypeGetCommand = FieldTypeGetCommand = {}));
