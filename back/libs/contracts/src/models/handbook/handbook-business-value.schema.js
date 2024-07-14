"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookBusinessValueSchema = void 0;
const handbook_schema_1 = require("./handbook.schema");
exports.HandbookBusinessValueSchema = handbook_schema_1.HandbookSchema.pick({
    name: true,
    description: true,
    canCustomerView: true,
    uuid: true,
    responsibleManagerUuid: true,
    workspaceUuid: true,
    lastChangeByUserUuid: true,
});
