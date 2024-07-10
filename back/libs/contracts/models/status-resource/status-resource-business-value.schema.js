"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusResourceBusinessValueSchema = void 0;
const status_resource_schema_1 = require("./status-resource.schema");
exports.StatusResourceBusinessValueSchema = status_resource_schema_1.StatusResourceSchema.pick({
    name: true,
    comment: true,
    uuid: true,
    lastChangeByUserUuid: true,
    createdAt: true,
    updatedAt: true,
});
