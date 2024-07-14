"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTypeCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const field_type_business_value_schema_1 = require("../../models/field-type/field-type-business-value.schema");
const FieldTypeCreateResponseEntitySchema = field_type_business_value_schema_1.FieldTypeBusinessValueSchema;
const FieldTypeCreateRequestSchema = models_1.FieldTypeSchema.pick({
    name: true,
    description: true,
    jsType: true,
});
const FieldTypeCreateResponseSchema = zod_1.z
    .object({
    data: FieldTypeCreateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var FieldTypeCreateCommand;
(function (FieldTypeCreateCommand) {
    FieldTypeCreateCommand.RequestSchema = FieldTypeCreateRequestSchema;
    FieldTypeCreateCommand.ResponseSchema = FieldTypeCreateResponseSchema;
    FieldTypeCreateCommand.ResponseEntitySchema = FieldTypeCreateResponseEntitySchema;
})(FieldTypeCreateCommand || (exports.FieldTypeCreateCommand = FieldTypeCreateCommand = {}));
