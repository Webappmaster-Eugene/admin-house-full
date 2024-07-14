"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusApproveBusinessValueSchema = void 0;
const status_approve_schema_1 = require("./status-approve.schema");
exports.StatusApproveBusinessValueSchema = status_approve_schema_1.StatusApproveSchema.pick({
    name: true,
    nameRu: true,
    comment: true,
    uuid: true,
    lastChangeByUserUuid: true,
    createdAt: true,
    updatedAt: true,
});
