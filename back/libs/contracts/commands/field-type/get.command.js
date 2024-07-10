"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTypeGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FieldTypeGetResponseEntitySchema = models_1.FieldTypeBusinessValueSchema;
const FieldTypeGetResponseSchema = zod_1.z
    .object({
    data: FieldTypeGetResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var FieldTypeGetCommand;
(function (FieldTypeGetCommand) {
    FieldTypeGetCommand.ResponseSchema = FieldTypeGetResponseSchema;
    FieldTypeGetCommand.ResponseEntitySchema = FieldTypeGetResponseEntitySchema;
})(FieldTypeGetCommand || (exports.FieldTypeGetCommand = FieldTypeGetCommand = {}));
