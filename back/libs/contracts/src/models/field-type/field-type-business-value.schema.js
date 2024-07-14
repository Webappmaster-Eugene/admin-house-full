"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldTypeBusinessValueSchema = void 0;
const field_type_1 = require("../field-type");
exports.FieldTypeBusinessValueSchema = field_type_1.FieldTypeSchema.pick({
    name: true,
    description: true,
    jsType: true,
    lastChangeByUserUuid: true,
    uuid: true,
});
