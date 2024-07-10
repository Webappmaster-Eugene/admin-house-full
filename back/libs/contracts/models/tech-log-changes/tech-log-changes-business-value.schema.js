"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechLogChangesBusinessValueSchema = void 0;
const tech_log_changes_schema_1 = require("./tech-log-changes.schema");
exports.TechLogChangesBusinessValueSchema = tech_log_changes_schema_1.TechLogChangesSchema.pick({
    name: true,
    entity: true,
    comment: true,
    oldInfo: true,
    newInfo: true,
    updateInfo: true,
    action: true,
    uuid: true,
    createdAt: true,
    updatedAt: true,
});
